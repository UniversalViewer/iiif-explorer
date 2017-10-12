/// <reference path="../../../node_modules/manifesto.js/dist/manifesto.d.ts" />
/// <reference path="../../../node_modules/manifold/dist/manifold.d.ts" />

import { Component, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';
import { IIIFExplorerData } from '../../IIIFExplorerData';

@Component({
	tag: 'iiif-explorer',
	styleUrl: 'iiif-explorer.scss'
})
export class IIIFExplorer {

	private _selected: Manifesto.IManifest | null;
	private _current: Manifesto.ICollection;
	private _parents: Manifesto.ICollection[] = [];

	@Prop() manifest: string;
	//@Prop() breadcrumbsEnabled: boolean = true;
	//@Prop() upLevelEnabled: boolean = true;

	@State() data: IIIFExplorerData = null;

	@Event() onSelectManifest: EventEmitter;
	@Event() onSelectCollection: EventEmitter;

	componentWillLoad() {

		Manifold.loadManifest({
			iiifResourceUri: this.manifest,
			collectionIndex: 0,
			manifestIndex: 0,
			sequenceIndex: 0,
			canvasIndex: 0
        } as Manifold.IManifoldOptions).then((helper) => {

			const root: Manifesto.IIIIFResource = helper.iiifResource;
			
			if (root.getProperty('within')) {
                // if the collection in within another, get the parents
                this._followWithin(root).then((parents: Manifesto.ICollection[]) => {
                    this._parents = parents;
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
                this._selected = root as Manifesto.IManifest;
            }

        }).catch(function(e) {
            console.error(e);
            console.error('failed to load manifest');
        });
	}

	private _gotoBreadcrumb(node: Manifesto.ICollection): void {
		let index: number = this._parents.indexOf(node);
		this._current = this._parents[index];
		this._parents = this._parents.slice(0, index + 1);
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

	private _switchToFolder(node: Manifesto.ICollection): void {
		if (!node.isLoaded) {
			node.load().then(this._switchToFolder.bind(this));
		} else {
			node.members.sort(this._sortCollectionsFirst);
			this._parents.push(node);
			this._current = node;
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
			parents: this._parents, 
			current: this._current, 
			selected: this._selected 
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
							<iiif-explorer-item item={item} selected={this._selected === item}></iiif-explorer-item>
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
			this._selected = item as Manifesto.IManifest;
			this.onSelectManifest.emit(item);
		}
	}

	@Listen('onSelectBreadcrumb')
	breadcrumbSelected(event: CustomEvent) {
		const item: Manifesto.Collection = event.detail;
		this._gotoBreadcrumb(item);
	}
}