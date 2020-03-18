import { loadManifest, parseManifest } from "manifesto.js";

export const load = async url => {
  return loadManifest(url);
};

export const parse = (manifest: string) => {
  return parseManifest(manifest);
};
