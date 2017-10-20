var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Event, Prop } from '@stencil/core';
import classNames from 'classnames';
let IIIFExplorerItem = class IIIFExplorerItem {
    constructor() {
        this.selected = false;
    }
    render() {
        const divClasses = classNames({
            'selected': this.selected,
            'explorer-folder': this.item.isCollection(),
            'explorer-resource': this.item.isManifest()
        });
        const aClasses = classNames({
            'explorer-folder-link': this.item.isCollection(),
            'explorer-item-link': this.item.isManifest(),
            'explorer-link': true
        });
        return (h("div", { class: divClasses },
            h("a", { onClick: () => this._itemSelectedHandler(), class: aClasses, title: this.item.getDefaultLabel() || 'no label' }, this.item.getDefaultLabel() || 'no label')));
    }
    _itemSelectedHandler() {
        this.onSelectItem.emit(this.item);
    }
};
__decorate([
    Prop()
], IIIFExplorerItem.prototype, "item", void 0);
__decorate([
    Prop()
], IIIFExplorerItem.prototype, "selected", void 0);
__decorate([
    Event()
], IIIFExplorerItem.prototype, "onSelectItem", void 0);
IIIFExplorerItem = __decorate([
    Component({
        tag: 'iiif-explorer-item',
        styleUrl: 'iiif-explorer-item.scss'
    })
], IIIFExplorerItem);
export { IIIFExplorerItem };
