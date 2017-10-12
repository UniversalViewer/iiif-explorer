import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
	tag: 'iiif-explorer-breadcrumb',
	styleUrl: 'iiif-explorer-breadcrumb.scss'
})
export class IIIFExplorerBreadcrumb {

	@Prop() collection: Manifesto.ICollection;

	@Event() onSelectBreadcrumb: EventEmitter;

	render() {

		return (
			<div class="explorer-breadcrumb explorer-item">
                <a 	onClick={() => this._breadcrumbSelectedHandler()}
                    class="explorer-breadcrumb-link explorer-link" 
                    href="#"
                    title={this.collection.getDefaultLabel()}>
                    {this.collection.getDefaultLabel()}
                </a>
            </div>
		)
	}

	private _breadcrumbSelectedHandler() {
		this.onSelectBreadcrumb.emit(this.collection);
	}
}