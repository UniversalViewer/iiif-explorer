export interface IIIFExplorerData {
    selected: Manifesto.IManifest | null;
    current: Manifesto.ICollection;
    parents: Manifesto.ICollection[];
}