import { IIIFResourceType } from "@iiif/vocabulary";
import '@ionic/core';
import {
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State
} from "@stencil/core";
import { Collection, IIIFResource, LanguageMap, loadManifest, Manifest, parseManifest } from "manifesto.js";

@Component({
  tag: "iiif-explorer",
  styleUrl: "iiif-explorer.css"
})
export class IIIFExplorer {
  @State() private _manifest: Manifest | null;
  @State() private _selectedCollection: Collection | null;
  @State() private _selectedManifest: Manifest | null;
  @State() private _parentCollections: Collection[] = [];
  @State() private _loaded: boolean;

  @Prop() public manifest: string;
  @Prop() public upLevelEnabled: boolean = true;
  @Prop() public pagingEnabled: boolean = true;
  @Prop() public pageSize: number = 25;

  @Event() protected selectManifest: EventEmitter;
  @Event() protected selectCollection: EventEmitter;
  @Event() protected upLevel: EventEmitter;

  protected async componentWillLoad() {
    if (this.manifest) {
      const data = await loadManifest(this.manifest);
      const root: IIIFResource = parseManifest(data);

      if (root.getProperty("within")) {
        // if the collection is within another, get the parents
        this._followWithin(root).then((parents: Collection[]) => {
          this._parentCollections = parents;
          let start = parents.pop();
          while (start && !start.isCollection()) {
            start = parents.pop();
          }
          this._openCollection(start as Collection);
        });
      }

      if (root.isCollection()) {
        this._openCollection(root as Collection);
      } else {
        this._manifest = root as Manifest;
      }
    }
  }

  private _gotoBreadcrumb(node: Collection): void {
    const index: number = this._parentCollections.indexOf(node);
    this._selectedCollection = this._parentCollections[index];
    this._parentCollections = this._parentCollections.slice(0, index + 1);
    this._selectedManifest = null;
  }

  private _sortCollectionsFirst(a: IIIFResource, b: IIIFResource): number {
    const aType: IIIFResourceType = a.getIIIFResourceType();
    const bType: IIIFResourceType = b.getIIIFResourceType();
    if (aType === bType) {
      // Alphabetical
      const aLabel: string = LanguageMap.getValue(a.getLabel());
      const bLabel: string = LanguageMap.getValue(b.getLabel());
      if (aLabel && bLabel) {
        return aLabel < bLabel ? -1 : 1;
      }
    }
    // Collections first
    return bType.indexOf("collection") - aType.indexOf("collection");
  }

  private _openCollection(collection: Collection): void {
    if (!collection.isLoaded) {
      // todo: allow passing a querystring param to collection.load() for paging.
      collection.load().then(this._openCollection.bind(this));
    } else {
      collection.items.sort(this._sortCollectionsFirst);
      this._parentCollections.push(collection);
      this._selectedCollection = collection;
      this._selectedManifest = null;
      this._loaded = true;
    }
  }

  private async _followWithin(node: IIIFResource): Promise<IIIFResource[]> {
    const url: any = node.getProperty("within");

    if (Array.isArray(url)) {
      // TODO: Handle multiple within values
      return [];
    }

    const parent = await loadManifest(url);
    const parentManifest: IIIFResource = parseManifest(parent);

    if (parentManifest.getProperty("within")) {
      this._followWithin(parentManifest).then((array: IIIFResource[]) => {
        array.push(node);
        return array;
      });
    }

    return [parentManifest, node];
  }

  protected render() {
    if (!this._loaded) {
      return <span>loading...</span>;
    } else if (this._manifest) {
      // it's a manifest without a parent collection
      return (
        <ion-content>
          <ion-list class="items">
            <iiif-explorer-item
              item={this._manifest}
              selected={
                this._selectedManifest &&
                this._selectedManifest.id === this._manifest.id
              }
            ></iiif-explorer-item>
          </ion-list>
        </ion-content>
      );
    } else {
      return (
        <ion-content>
          <ion-list class="breadcrumbs">
            {this._parentCollections.map((collection, index) => (
              <iiif-explorer-breadcrumb
                collection={collection}
                open={index === this._parentCollections.length - 1}
              ></iiif-explorer-breadcrumb>
            ))}
          </ion-list>
          <ion-item-divider></ion-item-divider>
          <ion-list class="items">
            {this._selectedCollection.items.map(item => (
              <iiif-explorer-item
                item={item}
                selected={
                  this._selectedManifest &&
                  this._selectedManifest.id === item.id
                }
              ></iiif-explorer-item>
            ))}
          </ion-list>
          {
            this.pagingEnabled && (
              <ion-infinite-scroll threshold="10%" onIonInfinite={e => this._loadPage(e)}>
                <ion-infinite-scroll-content
                  loading-spinner="dots">
                </ion-infinite-scroll-content>
              </ion-infinite-scroll>
            )
          }

        </ion-content>
      );
    }
  }

  private _loadPage(event: any) {

    console.log(event);

    setTimeout(() => {
      //this.addMoreItems();
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  @Listen("selectItem")
  protected itemSelected(event: CustomEvent) {
    const item: IIIFResource = event.detail;

    if (item.isCollection()) {
      this._openCollection(item as Collection);
      this.selectCollection.emit(item);
    } else {
      this._selectedManifest = item as Manifest;
      this.selectManifest.emit(item);
    }
  }

  @Listen("selectBreadcrumb")
  protected breadcrumbSelected(event: CustomEvent) {
    const item: Collection = event.detail;
    this._gotoBreadcrumb(item);
    this.upLevel.emit(item);
  }
}
