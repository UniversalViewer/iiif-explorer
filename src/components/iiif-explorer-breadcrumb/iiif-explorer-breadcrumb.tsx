import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import { Collection } from "manifesto.js";
import ArrowUpIcon from "../../assets/svg/arrow-up.svg";
import FolderOpenIcon from "../../assets/svg/folder-open.svg";
import FolderIcon from "../../assets/svg/folder.svg";

@Component({
  tag: "iiif-explorer-breadcrumb",
  styleUrl: "iiif-explorer-breadcrumb.css"
})
export class IIIFExplorerBreadcrumb {
  @Prop() public enabled: boolean = true;
  @Prop() public collection: Collection;
  @Prop() public isOpen: boolean;

  @Event() protected selectBreadcrumb: EventEmitter;
  @Event() protected upLevel: EventEmitter;

  protected render() {
    const label: string = this.collection.getDefaultLabel() || "no label";
    return (
      <ion-item class="breadcrumb">
        <ion-icon src={this.isOpen ? FolderOpenIcon : FolderIcon} slot="start" />
        <ion-label
          onClick={() => this.enabled ? this.selectBreadcrumb.emit(this.collection) : false}
          title={label}
          class={{
            "noselect": true,
            enabled: this.enabled
          }}
        >
          {label}
        </ion-label>
        {
          this.collection.parentCollection && (
            <ion-icon
              slot="end"
              class={{
                "up-arrow": true
              }}
              src={ArrowUpIcon}
              onClick={_e => this.upLevel.emit(this.collection.parentCollection)}
            />
          )
        }

      </ion-item>
    );
  }
}
