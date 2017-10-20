var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Event, Prop } from '@stencil/core';
let IIIFExplorerBreadcrumb = class IIIFExplorerBreadcrumb {
    render() {
        return (h("div", { class: "explorer-breadcrumb explorer-item" },
            h("a", { onClick: () => this._breadcrumbSelectedHandler(), class: "explorer-breadcrumb-link explorer-link", href: "#", title: this.collection.getDefaultLabel() || 'no label' }, this.collection.getDefaultLabel() || 'no label')));
    }
    _breadcrumbSelectedHandler() {
        this.onSelectBreadcrumb.emit(this.collection);
    }
};
__decorate([
    Prop()
], IIIFExplorerBreadcrumb.prototype, "collection", void 0);
__decorate([
    Event()
], IIIFExplorerBreadcrumb.prototype, "onSelectBreadcrumb", void 0);
IIIFExplorerBreadcrumb = __decorate([
    Component({
        tag: 'iiif-explorer-breadcrumb',
        styleUrl: 'iiif-explorer-breadcrumb.scss'
    })
], IIIFExplorerBreadcrumb);
export { IIIFExplorerBreadcrumb };
