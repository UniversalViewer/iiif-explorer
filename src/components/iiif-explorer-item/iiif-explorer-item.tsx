import { Clipboard } from "@edsilv/utils";
import { Component, Event, EventEmitter, h, Prop } from "@stencil/core";
import { IIIFResource } from "manifesto.js";
import CopyIcon from "../../assets/svg/copy.svg";
import FileIcon from "../../assets/svg/file.svg";
import FolderIcon from "../../assets/svg/folder.svg";
import { popoverController } from "@ionic/core";

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

  private _currentPopover = null;

  // private async _copyValue(value: string) {

  // }

  protected componentOnReady() {
    customElements.define('copied-message', class ModalContent extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `<span>Copied path</span>`;
      }
    });
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
            <ion-button
              title="Copy path"
              class={{
                copy: true
              }}
              onClick={async (ev) => {
                Clipboard.copy(this.item.id);
                const popover = await popoverController.create({
                  component: 'copied-message',
                  event: ev,
                  translucent: true,
                  showBackdrop: false
                });
                this._currentPopover = popover;
                return popover.present();
              }}
              slot="end">
              <ion-icon src={CopyIcon} />
            </ion-button>
          ]}
        </ion-item>
      )
    );
  }
}
