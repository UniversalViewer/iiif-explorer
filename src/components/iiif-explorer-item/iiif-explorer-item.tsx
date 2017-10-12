import { Component, Event, EventEmitter, Prop } from '@stencil/core';
import classNames  from 'classnames';

@Component({
	tag: 'iiif-explorer-item',
	styleUrl: 'iiif-explorer-item.scss'
})
export class IIIFExplorerItem {

	@Prop() item: Manifesto.IIIIFResource;
	@Prop() selected: boolean = false;

	@Event() onSelectItem: EventEmitter;

	render() {

		const divClasses = classNames(
			{ 
				'selected': this.selected,
				'explorer-folder': this.item.isCollection(),
				'explorer-resource': this.item.isManifest()
			}
		);

		const aClasses = classNames(
			{ 
				'explorer-folder-link': this.item.isCollection(),
				'explorer-item-link': this.item.isManifest(),
				'explorer-link': true
			}
		);

		return (
			<div class={divClasses}>
				<a onClick={() => this._itemSelectedHandler()} class={aClasses} title={this.item.getDefaultLabel()}>
					{this.item.getDefaultLabel()}
				</a>
			</div>
		)
	}

	private _itemSelectedHandler() {
		this.onSelectItem.emit(this.item);
	}
}