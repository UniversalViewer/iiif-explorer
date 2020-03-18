import { Component, h, Event, EventEmitter, Prop } from '@stencil/core';
import { Collection } from 'manifesto.js';

@Component({
	tag: 'iiif-explorer-breadcrumb',
	styleUrl: 'iiif-explorer-breadcrumb.css'
})
export class IIIFExplorerBreadcrumb {

	@Prop() collection: Collection;

	@Event() selectBreadcrumb: EventEmitter;

	render() {

		return (
			<div class="explorer-breadcrumb explorer-item">
          <a 	onClick={() => this._breadcrumbSelectedHandler()}
              class="explorer-breadcrumb-link explorer-link"
              href="#"
              title={this.collection.getDefaultLabel() || 'no label'}>
              {this.collection.getDefaultLabel() || 'no label'}
          </a>
      </div>
		)
	}

	private _breadcrumbSelectedHandler() {
		this.selectBreadcrumb.emit(this.collection);
	}
}
