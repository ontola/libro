/* eslint-disable */

import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import * as navigationPreload from 'workbox-navigation-preload';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { offlineFallback } from 'workbox-recipes';

const ONE_MONTH = 30 * 24 * 60 * 60; // eslint-disable-line no-magic-numbers

console.log("[SW][0/3] Starting");

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);
offlineFallback({
  pageFallback: "/public/offline.html"
});

/**
 * Assets caching
 */
registerRoute(
  /\.(?:js|css|gz)$/,
  new NetworkFirst({
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
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new NetworkFirst({
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

/**
 * Data resource caching
 * Currently limited to CACHE_IRIS while working out potential bugs.
 */

const CACHE_IRIS = [
  '/menus/info',
];

registerRoute(
  ({ url, request }) => {
    if (!CACHE_IRIS.includes(url.pathname)) {
      return false;
    }

    const accept = request.headers.get('Accept');

    return !!(accept && (
      accept.includes('text/n3')
      || accept.includes('application/n-triples')
      || accept.includes('application/hex+x-ndjson')
      || accept.includes('application/n-quads')
      || accept.includes('text/turtle')
      || accept.includes('application/vnd.api+json')
      || accept.includes('application/json')));
  },
  new NetworkFirst({
    cacheName: 'data-updates',
    plugins: [
      new BroadcastUpdatePlugin(),
    ],
  })
);

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

console.log("[SW][1/3] Configured");

(async () => {
  if (navigationPreload.isSupported()) {
    navigationPreload.enable();
  }

  await self.skipWaiting();
  console.log("[SW][2/3] Skipped waiting");

  clientsClaim();
  console.log("[SW][3/3] Claimed");
})();

/* eslint-enable */
