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
    "url": "build/myname.js",
    "revision": "2b9572171926a14a39968f9b61d15811"
  },
  {
    "url": "build/myname.registry.json",
    "revision": "cff5d43dfc37dbf464e6bba343f53dc5"
  },
  {
    "url": "build/myname/5jmzkg1i.js",
    "revision": "e0ba87f005e572a8e5459444eba214f1"
  },
  {
    "url": "build/myname/mxkxvvjy.js",
    "revision": "b0ef495bf8b6b681bed09ca6d48923d3"
  },
  {
    "url": "build/myname/myname.bio1c9da.pf.js",
    "revision": "96e50db1754204d582c6bfb036f7fd8b"
  },
  {
    "url": "build/myname/myname.q4rzytoz.js",
    "revision": "9fed51b48891c75b401ffc9f188156ae"
  },
  {
    "url": "build/myname/uyykddxl.css",
    "revision": "3d50550407a0c0d076cccbe0d3ec717b"
  },
  {
    "url": "build/myname/zh1kjm1r.css",
    "revision": "e1729c20990cdc6cc2d5c1ebd234c706"
  },
  {
    "url": "index.html",
    "revision": "d9372393c9e9fe044a7d593623d68b9d"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
