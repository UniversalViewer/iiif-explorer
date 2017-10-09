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
                    this._switchToFolder(start as Manifesto.Collection);
                });
            }

			if (root.isCollection()) {
                this._switchToFolder(root as Manifesto.Collection);
            } else {
                this._selected = root as Manifesto.IManifest;
            }

        }).catch(function(e) {
            console.error(e);
            console.error('failed to load manifest');
        });
	}

	private _gotoBreadcrumb(node: Manifesto.Collection): void {
		let index: number = this._parents.indexOf(node);
		this._current = this._parents[index];
		this._parents = this._parents.slice(0, index + 1);
		this._updateState();
	}

	private _sortCollectionsFirst(a: Manifesto.IIIFResource, b: Manifesto.IIIFResource): number {
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

	private _switchToFolder(node: Manifesto.Collection): void {
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
				  	let parentManifest = manifesto.create(parent);
				  	if (parentManifest.getProperty('within')) {
					  	this._followWithin(parentManifest).then((array: Manifesto.IIIFResource[]) => {
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
						this.data.parents.map((member) => 
							<iiif-explorer-breadcrumb member={member}></iiif-explorer-breadcrumb>
						)
					}
					</div>
					<hr/>
                    <div class="items">
					{
						this.data.current.members.map((member) => 	
							<iiif-explorer-item member={member} selected={this._selected === member}></iiif-explorer-item>
						)
					}
					</div>
				</div>
			)
		}
	}

	@Listen('onSelectItem')
	itemSelected(event: CustomEvent) {

		const member: Manifesto.IIIIFResource = event.detail;

		if (member.isCollection()) {
			this._switchToFolder(member as Manifesto.Collection);
			this.onSelectCollection.emit(member);
		} else {
			this._selected = member as Manifesto.IManifest;
			this.onSelectManifest.emit(member);
		}
	}

	@Listen('onSelectBreadcrumb')
	breadcrumbSelected(event: CustomEvent) {
		const member: Manifesto.Collection = event.detail;
		this._gotoBreadcrumb(member);
	}
}