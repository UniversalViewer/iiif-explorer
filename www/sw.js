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
    "revision": "328cbd3943c5611392eb708b2b344ea8"
  },
  {
    "url": "build/iiifexplorer.registry.json",
    "revision": "98516f1ea5db73500941750050747069"
  },
  {
    "url": "build/iiifexplorer/2nbrirmj.css",
    "revision": "fa020b0464fcff95f84d24c84b06cd26"
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
    "url": "build/iiifexplorer/p6ybjbzy.js",
    "revision": "83c998ae69bbc6f8604c9c67e628ddc5"
  },
  {
    "url": "build/iiifexplorer/vqqekv6w.css",
    "revision": "881261b097d58c5e7d7d6ce8fe6a0878"
  },
  {
    "url": "build/iiifexplorer/wqjrmqup.js",
    "revision": "5df4e98d9846d9bf5c61f6142a01aa91"
  },
  {
    "url": "index.html",
    "revision": "8b50fe86514d86006c301f44b39001da"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
