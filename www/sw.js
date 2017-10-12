importScripts('workbox-sw.prod.v2.0.3.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "build/iiifexplorer.js",
    "revision": "5cf14329a8c9d99681206b37e118f9fc"
  },
  {
    "url": "build/iiifexplorer.registry.json",
    "revision": "af9370272204ef256dd96d00f40a9e47"
  },
  {
    "url": "build/iiifexplorer/2nbrirmj.css",
    "revision": "fa020b0464fcff95f84d24c84b06cd26"
  },
  {
    "url": "build/iiifexplorer/hoddpwtr.js",
    "revision": "138751835a96fa5ac29c2257c7241d51"
  },
  {
    "url": "build/iiifexplorer/iiifexplorer.ckjjew2b.js",
    "revision": "a71095d12de49eea1089dbef82ecda89"
  },
  {
    "url": "build/iiifexplorer/iiifexplorer.qwfigcny.pf.js",
    "revision": "1e7f572eec03f8f0459e94ed981ac9f2"
  },
  {
    "url": "build/iiifexplorer/m9ilhifs.js",
    "revision": "717bd7dac67cd28845df48593aa8b6e4"
  },
  {
    "url": "build/iiifexplorer/vqqekv6w.css",
    "revision": "881261b097d58c5e7d7d6ce8fe6a0878"
  },
  {
    "url": "index.html",
    "revision": "15c88496ad0be4d206d0333220d99414"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
