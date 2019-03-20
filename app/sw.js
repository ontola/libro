/* globals workbox */
/* eslint-disable */

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.navigationPreload.enable();
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
workbox.precaching.cleanupOutdatedCaches();

/**
 * Assets caching
 */
workbox.routing.registerRoute(
  /\.(?:js|css|gz)$/,
  new workbox.strategies.StaleWhileRevalidate()
);

/**
 * Image caching
 */

const ONE_MONTH = 30 * 24 * 60 * 60; // eslint-disable-line no-magic-numbers

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
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

workbox.routing.registerRoute(
  ({ url, event }) => {
    if (!CACHE_IRIS.includes(url.pathname)) {
      return false;
    }

    const accept = event.request.headers.get('Accept');

    return !!(accept && (
      accept.includes('text/n3')
      || accept.includes('application/n-triples')
      || accept.includes('application/n-quads')
      || accept.includes('text/turtle')
      || accept.includes('application/vnd.api+json')
      || accept.includes('application/json')));
  },
  new workbox.strategies.StaleWhileRevalidate({
    plugins: [
      new workbox.broadcastUpdate.Plugin('data-updates'),
    ],
  })
);

/**
 * Page (html) caching
 * Serves a fallback html page if offline.
 */

const networkFirstHandler = new workbox.strategies.NetworkFirst({
  cacheName: 'default',
  plugins: [
    new workbox.expiration.Plugin({
      maxEntries: 10,
    }),
    new workbox.cacheableResponse.Plugin({
      statuses: [200],
    }),
  ],
});

const offlineCacheKey = workbox.precaching.getCacheKeyForURL('/offline.html');
workbox.routing.registerRoute(
  ({ event }) => event.request.mode === 'navigate',
  args => networkFirstHandler
    .handle(args)
    .then(response => ((!response) ? caches.match(offlineCacheKey) : response))
);

/**
 * Page communications
 */

self.addEventListener('message', (event) => {
  if (event.data && event.data.meta === 'ontola-request') {
    switch (event.data.type) {
      case 'CLEAR_CACHE_REQUEST':
        caches.keys().then((cacheNames) => {
          console.log(`clearing cache ${cacheNames}`);
          cacheNames.forEach(cache => self.caches.delete(cache));
        });
        break;
      default:
        console.warn('Unknown SW command');
        // TODO: bugsnag
    }
  }
});

/* eslint-enable */
