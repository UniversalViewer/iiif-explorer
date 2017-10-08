import { Component, Event, EventEmitter, Prop } from '@stencil/core';
import classNames  from 'classnames';

@Component({
	tag: 'iiif-explorer-item',
	styleUrl: 'iiif-explorer-item.scss'
})
export class IIIFExplorerItem {

	@Prop() member: Manifesto.IIIIFResource;
	@Prop() selected: boolean = false;

	@Event() onSelectItem: EventEmitter;

	render() {

		const divClasses = classNames(
			{ 
				'selected': this.selected,
				'explorer-folder': !!this.member.isCollection(),
				'explorer-resource': !!this.member.isManifest()
			}
		);

		const aClasses = classNames(
			{ 
				'explorer-folder-link': !!this.member.isCollection(),
				'explorer-item-link': !!this.member.isManifest(),
				'explorer-link': true
			}
		);

		return (
			<div class={divClasses}>
				<a onClick={() => this._itemSelectedHandler()} class={aClasses} href="#" title={this.member.getDefaultLabel()}>
					{this.member.getDefaultLabel()}
				</a>
			</div>
		)
	}

	private _itemSelectedHandler() {
		this.onSelectItem.emit(this.member);
	}
}