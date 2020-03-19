import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import { IIIFResource } from "manifesto.js";
// import FileIcon from "../../assets/svg/file.svg";
// import FolderIcon from "../../assets/svg/folder.svg";
// import FolderOpenIcon from "../../assets/svg/folder-open.svg";

@Component({
  tag: "iiif-explorer-item",
  styleUrl: "iiif-explorer-item.css"
})
export class IIIFExplorerItem {
  @Prop() public item: IIIFResource;
  @Prop() public selected: boolean = false;

  @Event() protected selectItem: EventEmitter;

  protected render() {
    return this.item && (
      <div
        class={{
          selected: this.selected,
          "explorer-folder": this.item.isCollection(),
          "explorer-resource": this.item.isManifest()
        }}
      >
        <a
          onClick={() => this.selectItem.emit(this.item)}
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
}
