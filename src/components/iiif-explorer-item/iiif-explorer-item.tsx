import { Component, h, Event, EventEmitter, Prop } from "@stencil/core";
import { IIIFResource } from "manifesto.js";

@Component({
  tag: "iiif-explorer-item",
  styleUrl: "iiif-explorer-item.css"
})
export class IIIFExplorerItem {
  @Prop() public item: IIIFResource;
  @Prop() public selected: boolean = false;

  @Event() protected selectItem: EventEmitter;

  protected render() {
    return (
      <div
        class={{
          selected: this.selected,
          "explorer-folder": this.item.isCollection(),
          "explorer-resource": this.item.isManifest()
        }}
      >
        <a
          onClick={() => this._itemSelectedHandler()}
          class={{
            "explorer-folder-link": this.item.isCollection(),
            "explorer-item-link": this.item.isManifest(),
            "explorer-link": true
          }}
          title={this.item.getDefaultLabel() || "no label"}
        >
          {this.item.getDefaultLabel() || "no label"}
        </a>
      </div>
    );
  }

  private _itemSelectedHandler() {
    this.selectItem.emit(this.item);
  }
}
