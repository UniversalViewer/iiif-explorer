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
import FolderIcon from "../../assets/svg/folder.svg";

@Component({
  tag: "iiif-explorer",
  styleUrl: "iiif-explorer.css"
})
export class IIIFExplorer {
  @State() private _items: IIIFResource[] = [];
  @State() private _loading: boolean;
  @State() private _selectedItem: Manifest | null;

  @Prop() public manifest: string;
  @Prop() public pagingEnabled: boolean;
  @Prop() public pageSize: number = 3;
  @Prop() public upLevelEnabled: boolean = true;
  @Prop() public pagingStartKey: string = "_start";
  @Prop() public pagingLimitKey: string = "_limit";
  @Prop() public pageLoadThreshold: string = "10%";

  @Event() protected selectCollection: EventEmitter;
  @Event() protected selectManifest: EventEmitter;
  @Event() protected upLevel: EventEmitter;

  private _parentCollections: Collection[] = [];
  private _currentCollectionId: string;
  private _currentPage: number = 0;

  protected async componentWillLoad() {
    this._loadCollection(this.manifest);
  }

  // this gets triggered when the user has scrolled to the bottom
  private async _loadPage(event: any) {
    this._currentPage = this._currentPage + 1;
    await this._loadCollection(this._currentCollectionId, this._currentPage);
    event.target.complete();
  }

  private _upLevel(collection: Collection): void {
    const index: number = this._parentCollections.indexOf(collection);
    this._parentCollections = this._parentCollections.slice(0, index);
    this._selectedItem = null;
    this._loadCollection(collection.id);
    this.upLevel.emit(collection);
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

  private get _pagingEnabled() {
    return (this.pagingEnabled && !!this.pagingStartKey && !!this.pagingLimitKey);
  }

  private _pageUrl(url: string, start: number, limit: number): string {
    const u = new URL(url);
    return `${u.origin}${u.pathname}${u.search}&${this.pagingStartKey}=${start}&${this.pagingLimitKey}=${limit}`;
  }

  // remove paging qs keys
  private _normaliseCollectionId(id: string): string {
    const url: URL = new URL(id);
    const params = new URLSearchParams(url.search.slice(1));
    params.delete(this.pagingStartKey);
    params.delete(this.pagingLimitKey);
    const normalisedUrl: string = `${url.origin}${url.pathname}?${params}`;
    return normalisedUrl;
  }

  private async _loadCollection(collectionId: string, page: number = 0): Promise<void> {
    this._loading = true;

    // reset currentPage if no page number is passed
    if (page === 0) {
      this._currentPage = 0;
    }

    if (this._pagingEnabled) {
      collectionId = this._pageUrl(collectionId, this._currentPage * this.pageSize, this.pageSize);
    }

    const data = await loadManifest(collectionId);
    const collection = parseManifest(data) as Collection;

    const nextCollectionId: string = this._normaliseCollectionId(collection.id);

    if (!collection.isCollection()) {
      // if it's a manifest, just list that
      this._items = [collection];
    } else {

      // if we're loading more items from the current collection
      if (this._currentCollectionId === nextCollectionId) {
        this._items = [...this._items, ...collection.items];
      } else {
        this._items = collection.items;
        this._parentCollections.push(collection);
      }

      // only sort items if paging isn't enabled, otherwise the order of items
      // will change each time a new page is loaded.
      if (!this.pagingEnabled) {
        this._items = this._items.sort(this._sortCollectionsFirst);
      }
    }

    this._selectedItem = null;
    this._currentCollectionId = nextCollectionId;
    this._loading = false;
  }

  // disabling this for now for simplicity
  // private async _followWithin(collection: Collection): Promise<Collection[]> {
  //   const url: any = collection.getProperty("within");

  //   if (Array.isArray(url)) {
  //     // TODO: Handle multiple within values
  //     return [];
  //   }

  //   const parent = await loadManifest(url);
  //   const parentCollection: Collection = parseManifest(parent) as Collection;

  //   if (parentCollection.getProperty("within")) {
  //     this._followWithin(parentCollection).then((array: Collection[]) => {
  //       array.push(collection);
  //       return array;
  //     });
  //   }

  //   return [parentCollection, collection];
  // }

  protected render() {
    return (
      <ion-content>
        {
          this._parentCollections.length > 0 && [
            <ion-list class="breadcrumbs">
              {this._parentCollections.map((collection, index) => (
                <iiif-explorer-breadcrumb
                  enabled={!this._loading}
                  collection={collection}
                  isOpen={index === this._parentCollections.length - 1}
                ></iiif-explorer-breadcrumb>
              ))}
              {
                this._loading && (
                  <ion-item class="breadcrumb">
                    <ion-icon src={FolderIcon} slot="start" />
                    <ion-spinner name="dots"></ion-spinner>
                  </ion-item>
                )
              }
            </ion-list>,
            <ion-item-divider></ion-item-divider>
          ]
        }
        <ion-list class="items">
          {this._items.map(item => (
            <iiif-explorer-item
              enabled={!this._loading}
              item={item}
              selected={
                this._selectedItem &&
                this._selectedItem.id === item.id
              }
            ></iiif-explorer-item>
          ))}
        </ion-list>
        {
          this._pagingEnabled && (
            <ion-infinite-scroll threshold={this.pageLoadThreshold} onIonInfinite={e => this._loadPage(e)}>
              <ion-infinite-scroll-content
                loading-spinner="dots">
              </ion-infinite-scroll-content>
            </ion-infinite-scroll>
          )
        }
      </ion-content>
    );
  }

  @Listen("selectItem")
  protected itemSelected(event: CustomEvent) {
    const item: IIIFResource = event.detail;

    if (item.isCollection()) {
      this._loadCollection(item.id);
      this.selectCollection.emit(item);
    } else {
      this._selectedItem = item as Manifest;
      this.selectManifest.emit(item);
    }
  }

  @Listen("selectBreadcrumb")
  protected breadcrumbSelected(event: CustomEvent) {
    const collection: Collection = event.detail;
    if (this._normaliseCollectionId(collection.id) !== this._currentCollectionId) {
      this._upLevel(collection);
    }
  }
}
