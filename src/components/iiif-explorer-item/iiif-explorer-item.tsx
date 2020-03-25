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
  @Prop() public popoverFadeTimeout: number = 1000;

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
            onClick={() =>
              this.enabled ? this.selectItem.emit(this.item) : false
            }
            title={label}
            class={{
              noselect: true,
              enabled: this.enabled
            }}
          >
            {label}
          </ion-label>
          {this.copyEnabled && [
            <div class="popover hide">Copied</div>,
            <ion-button
              title="Copy path"
              class={{
                copy: true
              }}
              onClick={async ev => {
                Clipboard.copy(this.item.id);
                const popover = (ev.target as any).parentElement.querySelector(
                  ".popover"
                );
                popover.classList.remove("hide");
                // popover.style.left = (ev.target as any).offsetLeft + "px";
                setTimeout(() => {
                  popover.classList.add("hide");
                }, this.popoverFadeTimeout);
              }}
              slot="end"
            >
              <ion-icon src={CopyIcon} />
            </ion-button>
          ]}
        </ion-item>
      )
    );
  }
}
