import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import { Collection } from "manifesto.js";
import FolderOpenIcon from "../../assets/svg/folder-open.svg";

@Component({
  tag: "iiif-explorer-breadcrumb",
  styleUrl: "iiif-explorer-breadcrumb.css"
})
export class IIIFExplorerBreadcrumb {
  @Prop() public collection: Collection;

  @Event() protected selectBreadcrumb: EventEmitter;

  protected render() {
    const label: string = this.collection.getDefaultLabel() || "no label";
    return (
      <ion-item class="breadcrumb item">
        <ion-icon src={FolderOpenIcon} />
        <ion-label
          onClick={() => this.selectBreadcrumb.emit(this.collection)}
          class="label"
          title={label}
        >
          {label}
        </ion-label>
      </ion-item>
    );
  }
}
