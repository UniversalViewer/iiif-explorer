import { Clipboard } from "@edsilv/utils";
import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import { IIIFResource } from "manifesto.js";
import CopyIcon from "../../assets/svg/copy.svg";
import FileIcon from "../../assets/svg/file.svg";
import FolderIcon from "../../assets/svg/folder.svg";

@Component({
  tag: "iiif-explorer-item",
  styleUrl: "iiif-explorer-item.css"
})
export class IIIFExplorerItem {
  @Prop() public copyEnabled: boolean = true;
  @Prop() public enabled: boolean = true;
  @Prop() public item: IIIFResource;
  @Prop() public selected: boolean = false;

  @Event() protected selectItem: EventEmitter;

  private _copyValue(value: string) {
    Clipboard.copy(value);
  }

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
            onClick={() => this.enabled ? this.selectItem.emit(this.item) : false }
            title={label}
            class={{
              "noselect": true,
              enabled: this.enabled
            }}
          >
            {label}
          </ion-label>
          {
            this.copyEnabled && (
              <ion-icon
                class={{
                  "copy": true
                }}
                onClick={_e => this._copyValue(this.item.id)}
                slot="end"
                src={CopyIcon}
              />
            )
          }
        </ion-item>
      )
    );
  }
}
