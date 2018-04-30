export interface IIIFExplorerData {
    manifest: Manifesto.IManifest | null;
    selectedManifest: Manifesto.IManifest | null;
    selectedCollection: Manifesto.ICollection | null;
    parentCollections: Manifesto.ICollection[];
}