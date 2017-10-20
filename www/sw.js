importScripts('workbox-sw.prod.v2.1.0.js');

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
    "revision": "210f38cb47cc744aa43d25d524237f1f"
  },
  {
    "url": "build/iiifexplorer.registry.json",
    "revision": "e3cf512643e9f918fb86b3e367d184a0"
  },
  {
    "url": "build/iiifexplorer/9kqelgkq.css",
    "revision": "de2f45df81119d0b64db7ffde7a05c76"
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
    "url": "build/iiifexplorer/use86z55.js",
    "revision": "0ccf556f72b63c13408c5032a5bb07e9"
  },
  {
    "url": "index.html",
    "revision": "f93aaf9e264301d730962be3c95fb5b3"
  },
  {
    "url": "workbox-sw.prod.v2.0.3.js",
    "revision": "60b4da760c6a02cbbf5efc80c4da7090"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
