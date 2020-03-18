import { IIIFResourceType } from "@iiif/vocabulary";
import {
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State
} from "@stencil/core";
import { Collection, IIIFResource, LanguageMap, Manifest } from "manifesto.js";
import { load, parse } from "../../utils";

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

  @Event() protected selectManifest: EventEmitter;
  @Event() protected selectCollection: EventEmitter;
  @Event() protected upLevel: EventEmitter;

  protected async componentWillLoad() {
    if (this.manifest) {
      const data = await load(this.manifest);
      const root: IIIFResource = parse(data);

      if (root.getProperty("within")) {
        // if the collection is within another, get the parents
        this._followWithin(root).then((parents: Collection[]) => {
          this._parentCollections = parents;
          let start = parents.pop();
          while (start && !start.isCollection()) {
            start = parents.pop();
          }
          this._switchToFolder(start as Collection);
        });
      }

      if (root.isCollection()) {
        this._switchToFolder(root as Collection);
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

  private _switchToFolder(collection: Collection): void {
    if (!collection.isLoaded) {
      collection.load().then(this._switchToFolder.bind(this));
    } else {
      collection.items.sort(this._sortCollectionsFirst);
      this._parentCollections.push(collection);
      // this._selectedCollection = collection;
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

    const parent = await load(url);
    const parentManifest: IIIFResource = parse(parent);

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
    } else if (this.manifest) {
      // it's a manifest without a parent collection
      return (
        <div>
          <div class="items">
            {
              <iiif-explorer-item
                item={this._manifest}
                selected={
                  this._selectedManifest &&
                  this._selectedManifest.id === this._manifest.id
                }
              ></iiif-explorer-item>
            }
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div class="breadcrumbs">
            {this._parentCollections.map(collection => (
              <iiif-explorer-breadcrumb
                collection={collection}
              ></iiif-explorer-breadcrumb>
            ))}
          </div>
          <hr />
          <div class="items">
            {this._selectedCollection.items.map(item => (
              <iiif-explorer-item
                item={item}
                selected={
                  this._selectedManifest &&
                  this._selectedManifest.id === item.id
                }
              ></iiif-explorer-item>
            ))}
          </div>
        </div>
      );
    }
  }

  @Listen("selectItem")
  protected itemSelected(event: CustomEvent) {
    const item: IIIFResource = event.detail;

    if (item.isCollection()) {
      this._switchToFolder(item as Collection);
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
