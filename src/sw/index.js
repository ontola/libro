/* eslint-disable */

import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { offlineFallback } from 'workbox-recipes';
import { registerRoute, setDefaultHandler } from 'workbox-routing';
import {
  CacheFirst,
  NetworkOnly,
  StaleWhileRevalidate
} from 'workbox-strategies';

const offlineFile = '/f_assets/offline.html';

self.skipWaiting();

clientsClaim();
cleanupOutdatedCaches();

const whitelist = [
  'main',
  'actioncable',
  'Forms',
  'offline.html',
];
const blacklist = [
  '.map',
  'LICENSE',
];

precacheAndRoute((self.__WB_MANIFEST).filter((entry) =>
  whitelist.some((b) => entry.url.includes(b))
  && !blacklist.some((b) => entry.url.includes(b))
));

const ONE_MONTH = 30 * 24 * 60 * 60; // eslint-disable-line @typescript-eslint/no-magic-numbers

/**
 * Assets caching
 */
registerRoute(
  /\.(?:|gz|ttf|woff|woff2|otf)$/,
  new CacheFirst({
    cacheName: 'assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: ONE_MONTH,
        maxEntries: 120,
      }),
    ],
  }),
);

/**
 * Image caching
 */

registerRoute(
  /\.(?:apng|png|gif|jpg|jpeg|svg|avif|webp)$/,
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: ONE_MONTH,
        maxEntries: 120,
      }),
    ],
  })
);

// /**
//  * Data resource caching
//  * Currently limited to CACHE_IRIS while working out potential bugs.
//  */
//
// const CACHE_IRIS = [
//   '/menus/info',
// ];
//
// registerRoute(
//   ({ url, request }) => {
//     if (!CACHE_IRIS.includes(url.pathname)) {
//       return false;
//     }
//
//     const accept = request.headers.get('Accept');
//
//     return !!(accept && (
//       accept.includes('text/n3')
//       || accept.includes('application/n-triples')
//       || accept.includes('application/hex+x-ndjson')
//       || accept.includes('application/n-quads')
//       || accept.includes('text/turtle')
//       || accept.includes('application/vnd.api+json')
//       || accept.includes('application/json')));
//   },
//   new StaleWhileRevalidate({
//     cacheName: 'data-updates',
//     plugins: [
//       new BroadcastUpdatePlugin(),
//     ],
//   })
// );
setDefaultHandler(new NetworkOnly());

offlineFallback({
  pageFallback: offlineFile,
});

/**
 * Page communications
 */

self.addEventListener('message', (event) => {
  if (event.data && event.data.meta === 'ontola-request') {
    switch (event.data.type) {
    case 'CLEAR_CACHE_REQUEST':
      caches.keys().then((cacheNames) => {
        // tslint:disable-next-line:no-console
        console.log(`clearing cache ${cacheNames}`);
        cacheNames.forEach((cache) => self.caches.delete(cache));
      });
      break;
    default:
      // tslint:disable-next-line:no-console
      console.warn('Unknown SW command');
        // TODO: bugsnag
    }
  }
});

/* eslint-enable */
