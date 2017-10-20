/// <reference path="../../../node_modules/manifesto.js/dist/manifesto.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, State, Listen, Event } from '@stencil/core';
let IIIFExplorer = class IIIFExplorer {
    constructor() {
        this._parents = [];
        //@Prop() breadcrumbsEnabled: boolean = true;
        this.upLevelEnabled = true;
        this.data = null;
    }
    componentWillLoad() {
        manifesto.loadManifest(this.manifest).then((data) => {
            const root = manifesto.create(data);
            if (root.getProperty('within')) {
                // if the collection in within another, get the parents
                this._followWithin(root).then((parents) => {
                    this._parents = parents;
                    let start = parents.pop();
                    while (start && !start.isCollection()) {
                        start = parents.pop();
                    }
                    this._switchToFolder(start);
                });
            }
            if (root.isCollection()) {
                this._switchToFolder(root);
            }
            else {
                this._selected = root;
            }
        }).catch(function (e) {
            console.error(e);
            console.error('failed to load manifest');
        });
    }
    _gotoBreadcrumb(node) {
        let index = this._parents.indexOf(node);
        this._current = this._parents[index];
        this._parents = this._parents.slice(0, index + 1);
        this._updateState();
    }
    _sortCollectionsFirst(a, b) {
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
    _switchToFolder(node) {
        if (!node.isLoaded) {
            node.load().then(this._switchToFolder.bind(this));
        }
        else {
            node.members.sort(this._sortCollectionsFirst);
            this._parents.push(node);
            this._current = node;
            this._updateState();
        }
    }
    _followWithin(node) {
        return new Promise((resolve, reject) => {
            let url = node.getProperty('within');
            if (Array.isArray(url)) {
                resolve([]);
            }
            Manifesto.Utils.loadResource(url)
                .then((parent) => {
                const parentManifest = manifesto.create(parent);
                if (parentManifest.getProperty('within')) {
                    this._followWithin(parentManifest).then((array) => {
                        array.push(node);
                        resolve(array);
                    });
                }
                else {
                    resolve([parentManifest, node]);
                }
            }).catch(reject);
        });
    }
    _updateState() {
        this.data = {
            parents: this._parents,
            current: this._current,
            selected: this._selected
        };
    }
    render() {
        if (!this.data) {
            return (h("span", null, "loading..."));
        }
        else {
            return (h("div", null,
                h("div", { class: "breadcrumbs" }, this.data.parents.map((collection) => h("iiif-explorer-breadcrumb", { collection: collection }))),
                h("hr", null),
                h("div", { class: "items" }, this.data.current.members.map((item) => h("iiif-explorer-item", { item: item, selected: this._selected === item })))));
        }
    }
    itemSelected(event) {
        const item = event.detail;
        if (item.isCollection()) {
            this._switchToFolder(item);
            this.onSelectCollection.emit(item);
        }
        else {
            this._selected = item;
            this.onSelectManifest.emit(item);
        }
    }
    breadcrumbSelected(event) {
        const item = event.detail;
        this._gotoBreadcrumb(item);
    }
};
__decorate([
    Prop()
], IIIFExplorer.prototype, "manifest", void 0);
__decorate([
    Prop()
], IIIFExplorer.prototype, "upLevelEnabled", void 0);
__decorate([
    State()
], IIIFExplorer.prototype, "data", void 0);
__decorate([
    Event()
], IIIFExplorer.prototype, "onSelectManifest", void 0);
__decorate([
    Event()
], IIIFExplorer.prototype, "onSelectCollection", void 0);
__decorate([
    Listen('onSelectItem')
], IIIFExplorer.prototype, "itemSelected", null);
__decorate([
    Listen('onSelectBreadcrumb')
], IIIFExplorer.prototype, "breadcrumbSelected", null);
IIIFExplorer = __decorate([
    Component({
        tag: 'iiif-explorer',
        styleUrl: 'iiif-explorer.scss'
    })
], IIIFExplorer);
export { IIIFExplorer };
