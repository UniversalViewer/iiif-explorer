/// <reference path="../../../node_modules/manifesto.js/dist/manifesto.d.ts" />

import { Component, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';
import { IIIFExplorerData } from '../../IIIFExplorerData';

@Component({
	tag: 'iiif-explorer',
	styleUrl: 'iiif-explorer.scss'
})
export class IIIFExplorer {

	private _currentManifest: Manifesto.IManifest | null;
	private _currentCollection: Manifesto.ICollection;
	private _parentCollections: Manifesto.ICollection[] = [];

	@Prop() manifest: string;
	//@Prop() breadcrumbsEnabled: boolean = true;
	@Prop() upLevelEnabled: boolean = true;

	@State() data: IIIFExplorerData = null;

	@Event() onSelectManifest: EventEmitter;
	@Event() onSelectCollection: EventEmitter;
	@Event() onUpLevel: EventEmitter;

	componentWillLoad() {

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
                this._currentManifest = root as Manifesto.IManifest;
            }

        }).catch(function(e) {
            console.error(e);
            console.error('failed to load manifest');
        });
	}

	private _gotoBreadcrumb(node: Manifesto.ICollection): void {
		let index: number = this._parentCollections.indexOf(node);
		this._currentCollection = this._parentCollections[index];
		this._parentCollections = this._parentCollections.slice(0, index + 1);
		this._currentManifest = null;
		this._updateState();
	}

	private _sortCollectionsFirst(a: Manifesto.IIIIFResource, b: Manifesto.IIIIFResource): number {
		let aType = a.getIIIFResourceType().value;
		let bType = b.getIIIFResourceType().value;
		if (aType === bType) {
			// Alphabetical
			let aLabel = Manifesto.TranslationCollection.getValue(a.getLabel());
			let bLabel = Manifesto.TranslationCollection.getValue(b.getLabel());
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
			collection.members.sort(this._sortCollectionsFirst);
			this._parentCollections.push(collection);
			this._currentCollection = collection;
			this._currentManifest = null;
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
			parents: this._parentCollections, 
			current: this._currentCollection, 
			selected: this._currentManifest 
		};

	}

	render() {

		if (!this.data) {
			return (<span>loading...</span>)
		} else {

			return ( 
				<div>
					<div class="breadcrumbs">
					{
						this.data.parents.map((collection) => 
							<iiif-explorer-breadcrumb collection={collection}></iiif-explorer-breadcrumb>
						)
					}
					</div>
					<hr/>
                    <div class="items">
					{
						this.data.current.members.map((item) => 
							<iiif-explorer-item item={item} selected={this._currentManifest === item}></iiif-explorer-item>
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
			this._currentManifest = item as Manifesto.IManifest;
			this.onSelectManifest.emit(item);
		}
	}

	@Listen('onSelectBreadcrumb')
	breadcrumbSelected(event: CustomEvent) {
		const item: Manifesto.Collection = event.detail;
		this._gotoBreadcrumb(item);
		this.onUpLevel.emit(item);
	}
}