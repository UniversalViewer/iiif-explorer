import { Component, Prop, State, Listen, Event, EventEmitter, Method, Watch } from '@stencil/core';
import { IIIFExplorerData } from '../../IIIFExplorerData';

@Component({
	tag: 'iiif-explorer',
	styleUrl: 'iiif-explorer.css'
})
export class IIIFExplorer {

	private _manifest: Manifesto.IManifest | null;
	private _selectedManifest: Manifesto.IManifest | null;
	private _selectedCollection: Manifesto.ICollection | null;
	private _parentCollections: Manifesto.ICollection[] = [];

	@Prop() manifest: string;
	@Watch('manifest')
	watchHandler() {
		this._reset();
	}
	//@Prop() breadcrumbsEnabled: boolean = true;
	@Prop() upLevelEnabled: boolean = true;

	@State() data: IIIFExplorerData = null;

	@Event() onSelectManifest: EventEmitter;
	@Event() onSelectCollection: EventEmitter;
	@Event() onUpLevel: EventEmitter;

	componentWillLoad() {
		this._reset();
	}

	private _reset(): void {

		this._manifest = null;
		this._selectedManifest = null;
		this._selectedCollection = null;
		this._parentCollections = [];

		if (this.manifest) {
			
			manifesto.loadManifest(this.manifest).then((data) => {

				const root: Manifesto.IIIIFResource = manifesto.create(data);
				
				if (root.getProperty('within')) {
					// if the collection in within another, get the parents
					this._followWithin(root).then((parents: Manifesto.ICollection[]) => {
						this._parentCollections = parents;
						let start = parents.pop();
						while (start && !start.isCollection()) {
							start = parents.pop();
						}
						this._switchToFolder(start as Manifesto.ICollection);
					});
				}
	
				if (root.isCollection()) {
					this._switchToFolder(root as Manifesto.ICollection);
				} else {
					this._manifest = root as Manifesto.IManifest;
					this._updateState();
				}
	
			}).catch(function(e) {
				console.error(e);
				console.error('failed to load manifest');
			});
		}
	}

	private _gotoBreadcrumb(node: Manifesto.ICollection): void {
		let index: number = this._parentCollections.indexOf(node);
		this._selectedCollection = this._parentCollections[index];
		this._parentCollections = this._parentCollections.slice(0, index + 1);
		this._selectedManifest = null;
		this._updateState();
	}

	private _sortCollectionsFirst(a: Manifesto.IIIIFResource, b: Manifesto.IIIIFResource): number {
		let aType = a.getIIIFResourceType().value;
		let bType = b.getIIIFResourceType().value;
		if (aType === bType) {
			// Alphabetical
			let aLabel = Manifesto.LanguageMap.getValue(a.getLabel());
			let bLabel = Manifesto.LanguageMap.getValue(b.getLabel());
			if (aLabel && bLabel) {
				return aLabel < bLabel ? -1 : 1;
			}
		}
		// Collections first
		return bType.indexOf('collection') - aType.indexOf('collection');
	}

	private _switchToFolder(collection: Manifesto.ICollection): void {
		if (!collection.isLoaded) {
			collection.load().then(this._switchToFolder.bind(this));
		} else {
			collection.items.sort(this._sortCollectionsFirst);
			this._parentCollections.push(collection);
			this._selectedCollection = collection;
			this._selectedManifest = null;
			this._updateState();
		}
	}
	
	private _followWithin(node: Manifesto.IIIIFResource): Promise<Manifesto.IIIIFResource[]> {
		return new Promise<any>((resolve, reject) => {
			let url: any = node.getProperty('within');
			if (Array.isArray(url)) { // TODO: Handle multiple within values
				resolve([]);
			}

			Manifesto.Utils.loadResource(url)
				.then((parent: any) => {
				  	const parentManifest: Manifesto.IIIIFResource = manifesto.create(parent);
				  	if (parentManifest.getProperty('within')) {
					  	this._followWithin(parentManifest).then((array: Manifesto.IIIIFResource[]) => {
						  	array.push(node);
						  	resolve(array);
					  	});
				  	} else {
					  	resolve([parentManifest, node]);
				  	}
				}).catch(reject);
		});
	}

	private _updateState(): void {

		this.data = { 
			manifest: this._manifest,
			parentCollections: this._parentCollections, 
			selectedCollection: this._selectedCollection, 
			selectedManifest: this._selectedManifest 
		};

	}

	@Method()
	public reset(): void{
		this._reset();
		this._updateState();
	}

	render() {

		if (!this.data) {
			return (<span>loading...</span>)
		} else if (this.data.manifest) {
			// it's a manifest without a parent collection
			return (
				<div>
					<div class="items">
					{
						<iiif-explorer-item item={this.data.manifest} selected={this.data.selectedManifest && this.data.selectedManifest.id === this._manifest.id}></iiif-explorer-item>
					}
					</div>
				</div>
			)
		} else {

			return ( 
				<div>
					<div class="breadcrumbs">
					{
						this.data.parentCollections.map((collection) => 
							<iiif-explorer-breadcrumb collection={collection}></iiif-explorer-breadcrumb>
						)
					}
					</div>
					<hr/>
                    <div class="items">
					{
						this.data.selectedCollection.items.map((item) => 
							<iiif-explorer-item item={item} selected={this._selectedManifest && this._selectedManifest.id === item.id}></iiif-explorer-item>
						)
					}
					</div>
				</div>
			)
		}
	}

	@Listen('onSelectItem')
	itemSelected(event: CustomEvent) {

		const item: Manifesto.IIIIFResource = event.detail;

		if (item.isCollection()) {
			this._switchToFolder(item as Manifesto.Collection);
			this.onSelectCollection.emit(item);
		} else {
			this._selectedManifest = item as Manifesto.IManifest;
			this.onSelectManifest.emit(item);
			this._updateState();
		}
	}

	@Listen('onSelectBreadcrumb')
	breadcrumbSelected(event: CustomEvent) {
		const item: Manifesto.Collection = event.detail;
		this._gotoBreadcrumb(item);
		this.onUpLevel.emit(item);
	}
}