importScripts('workbox-sw.prod.v2.1.2.js');

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
    "revision": "adf9cc333edbfca1571cc1f188c43ae4"
  },
  {
    "url": "build/iiifexplorer/7zytydlm.js",
    "revision": "7a2bfa2a2e9eb333b2390085afe498cf"
  },
  {
    "url": "build/iiifexplorer/iiifexplorer.gkk0soev.js",
    "revision": "8d727345e96e8db3aa573f451f33df87"
  },
  {
    "url": "build/iiifexplorer/iiifexplorer.registry.json",
    "revision": "bfd33d171aaea1a9d1bb74087398aadb"
  },
  {
    "url": "build/iiifexplorer/iiifexplorer.vcke74st.js",
    "revision": "7b553c55f7d0a74aead68ab6cff19a92"
  },
  {
    "url": "index.html",
    "revision": "53c16721f5724801455c2ab6a3985576"
  },
  {
    "url": "workbox-sw.prod.v2.0.3.js",
    "revision": "60b4da760c6a02cbbf5efc80c4da7090"
  },
  {
    "url": "workbox-sw.prod.v2.1.0.js",
    "revision": "e5f207838d7fd9c81835d5705a73cfa2"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
