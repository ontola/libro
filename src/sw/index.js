/* eslint-disable */

import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import * as navigationPreload from 'workbox-navigation-preload';
import { cleanupOutdatedCaches, createHandlerBoundToURL, matchPrecache, precacheAndRoute } from 'workbox-precaching';
import { NavigationRoute, registerRoute, setCatchHandler } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';

(async () => {
  await self.skipWaiting();

  clientsClaim();
  if (navigationPreload.isSupported()) {
    navigationPreload.enable();
  }
  cleanupOutdatedCaches();

  precacheAndRoute(self.__WB_MANIFEST);
  setCatchHandler(async ({ request }) => {
    // Return the precached offline page if a document is being requested
    if (request.destination === 'document') {
      const offline = await matchPrecache('/public/offline.html');

      if (offline) {
        return offline;
      }
    }

    return Response.error();
  });

  /**
   * Assets caching
   */
  registerRoute(
    /\.(?:js|css|gz)$/,
    new StaleWhileRevalidate({
      cacheName: 'assets',
      plugins: [
        new CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    }),
  );

  /**
   * Image caching
   */

  const ONE_MONTH = 30 * 24 * 60 * 60; // eslint-disable-line @typescript-eslint/no-magic-numbers

  registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
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
    new StaleWhileRevalidate({
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
})();

/* eslint-enable */
