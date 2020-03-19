import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import { IIIFResource } from "manifesto.js";
import FileIcon from "../../assets/svg/file.svg";
import FolderIcon from "../../assets/svg/folder.svg";

@Component({
  tag: "iiif-explorer-item",
  styleUrl: "iiif-explorer-item.css"
})
export class IIIFExplorerItem {
  @Prop() public item: IIIFResource;
  @Prop() public selected: boolean = false;

  @Event() protected selectItem: EventEmitter;

  protected render() {
    const label: string = this.item.getDefaultLabel() || "no label";
    return (
      this.item && (
        <ion-item
          class={{
            selected: this.selected,
            folder: this.item.isCollection(),
            file: this.item.isManifest()
          }}
        >
          <ion-icon
            slot="start"
            src={this.item.isCollection() ? FolderIcon : FileIcon}
          />
          <ion-label
            onClick={() => this.selectItem.emit(this.item)}
            title={label}
          >
            {label}
          </ion-label>
        </ion-item>
      )
    );
  }
}
