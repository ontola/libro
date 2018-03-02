import { ASSETS_HOST } from '../../app/config';

import manifest from './manifest';

export const renderFullPage = (html, devPort, domain, csrfToken, initialState = {}, head) => {
  const bundleCSS = process.env.NODE_ENV === 'production'
    ? `<link rel="stylesheet" type="text/css" href="${ASSETS_HOST}${manifest['main.css']}" />`
    : '';
  const bugsnagKey = process.env.BUGSNAG_KEY;

  return `<!doctype html>
    <meta charset="utf-8">
    <html>
      <head>
        <meta charset="utf-8" />
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href="/static/preloader.css" />
        <link rel="manifest" href="${ASSETS_HOST}/static/manifest.json">

        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="application-name" content="AOD">
        <meta name="apple-mobile-web-app-title" content="AOD">
        <meta name="theme-color" content="#60707F">
        <meta name="msapplication-navbutton-color" content="#60707F">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="msapplication-starturl" content="/">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <meta name="csrf-param" content="authenticity_token">
        <meta name="csrf-token" content="${csrfToken}">
        <script src="//d2wy8f7a9ursnm.cloudfront.net/bugsnag-3.min.js" data-apikey="${bugsnagKey}"></script>

        <link rel="icon" type="image/png" sizes="192x192" href="/static/icon-large.png">
        <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/static/icon-large.png">
        <link rel="icon" type="image/png" sizes="128x128" href="/static/icon-medium.png">
        <link rel="apple-touch-icon" type="image/png" sizes="128x128" href="/static/icon-medium.png">
        <link rel="icon" type="image/png" sizes="72x72" href="/static/icon-small.png">
        <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/static/icon-small.png">
        ${head ? head.title.toString() : ''}
        ${head ? head.meta.toString() : ''}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        ${bundleCSS}
        <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=default,Promise,Promise.prototype.finally|gated,fetch" async></script>
      </head>
      <body>
        <div class="preloader">
          <div class="preloader__logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="28" viewBox="0 0 211 108">
              <rect class="preloader__logo__rect--con" x="159.8" y="86.4" width="51.2" height="8.3" />
              <rect class="preloader__logo__rect--pro" y="86.2" width="86.9" height="8.4" />
              <rect class="preloader__logo__rect--motion" y="14.3" width="211" height="8.4" />
              <path d="M20.3 81c-2.5 0-4.8-0.4-6.9-1.2 -2.1-0.8-4-1.9-5.5-3.4 -1.5-1.4-2.7-3.1-3.6-5.1 -0.9-2-1.3-4.1-1.3-6.4 0-2.4 0.5-4.6 1.6-6.6s2.5-3.7 4.5-5.1c1.9-1.4 4.2-2.5 6.9-3.3 2.6-0.8 5.6-1.2 8.8-1.2 2.4 0 4.8 0.2 7.2 0.6 2.4 0.4 4.5 1 6.4 1.7v-3.5c0-3.8-1.1-6.7-3.2-8.9 -2.2-2.1-5.3-3.2-9.3-3.2 -2.7 0-5.4 0.5-8.1 1.5 -2.6 1-5.4 2.5-8.2 4.4l-3.3-6.9c6.6-4.4 13.5-6.7 20.6-6.7 7.1 0 12.5 1.8 16.5 5.4 3.9 3.6 5.9 8.8 5.9 15.5v18.5c0 1.2 0.2 2.1 0.7 2.6 0.5 0.5 1.2 0.8 2.4 0.9v9.2c-1 0.2-2 0.3-2.9 0.4 -0.9 0.1-1.7 0.1-2.4 0.1 -2.1-0.1-3.7-0.7-4.8-1.7s-1.7-2.3-2-3.9l-0.3-3.2c-2.3 3-5.1 5.3-8.5 6.9C27.7 80.2 24.1 81 20.3 81zM23.2 73.1c2.6 0 5.1-0.5 7.4-1.4 2.3-0.9 4.1-2.3 5.4-4 1.4-1.2 2.1-2.4 2.1-3.7v-6.8c-1.8-0.7-3.8-1.3-5.8-1.7 -2.1-0.4-4.1-0.6-6-0.6 -3.9 0-7 0.8-9.5 2.5 -2.4 1.7-3.7 3.9-3.7 6.6 0 2.5 0.9 4.7 2.8 6.4C17.9 72.2 20.3 73.1 23.2 73.1z" />
              <path d="M90.8 38.1c-4.2 0.1-7.9 1.1-11.1 2.9 -3.2 1.8-5.5 4.4-7 7.7v31.4H62V28.8h10v11.5c1.8-3.5 4.2-6.4 7-8.6 2.8-2.2 5.9-3.3 9.1-3.3 0.7 0 1.2 0 1.6 0 0.4 0 0.8 0 1.1 0.1V38.1z" />
              <path d="M119.1 80.5c-3.5 0-6.6-0.7-9.5-2.1 -2.8-1.4-5.3-3.3-7.4-5.7 -2.1-2.4-3.7-5.2-4.8-8.3 -1.1-3.1-1.7-6.4-1.7-9.9 0-3.7 0.6-7.1 1.7-10.3 1.1-3.2 2.8-6 4.9-8.4 2.1-2.4 4.6-4.3 7.5-5.7 2.9-1.4 6.1-2.1 9.7-2.1 4.2 0 7.8 1 10.9 2.9 3.1 2 5.6 4.5 7.6 7.6v-9.7h9.5v49.8c0 3.7-0.7 7-2.1 9.9 -1.4 2.9-3.3 5.3-5.7 7.3 -2.4 2-5.3 3.5-8.7 4.6 -3.3 1-6.9 1.6-10.8 1.6 -5.7 0-10.4-1-14.1-2.9 -3.7-1.9-6.9-4.6-9.5-8.1l6.1-5.7c2 2.7 4.5 4.8 7.6 6.3 3.1 1.4 6.4 2.2 9.9 2.2 2.2 0 4.3-0.3 6.3-0.9 2-0.6 3.7-1.5 5.2-2.7 1.5-1.2 2.7-2.8 3.6-4.7 0.9-1.9 1.3-4.1 1.3-6.8v-7.8c-1.8 3.1-4.3 5.6-7.5 7.3C125.9 79.7 122.6 80.5 119.1 80.5zM122.6 71.8c1.6 0 3.2-0.3 4.7-0.8 1.5-0.6 2.9-1.3 4.2-2.3 1.3-0.9 2.4-2 3.3-3.2 0.9-1.2 1.6-2.5 2-3.9V48.2c-1.3-3.3-3.3-5.9-6.1-8 -2.7-2.1-5.7-3.1-8.8-3.1 -2.4 0-4.5 0.5-6.3 1.5 -1.9 1-3.4 2.4-4.8 4 -1.3 1.7-2.3 3.5-3 5.6 -0.7 2.1-1.1 4.2-1.1 6.5 0 2.4 0.4 4.6 1.2 6.6 0.8 2.1 1.9 3.9 3.4 5.4 1.4 1.5 3.1 2.8 5 3.7C118.2 71.4 120.3 71.8 122.6 71.8z" />
              <path d="M175.9 81c-5.3 0-9.3-1.7-12.1-5.2 -2.7-3.5-4.1-8.7-4.1-15.6v-31.4h10.8V58c0 9.2 3.2 13.8 9.7 13.8 3.1 0 6.1-0.9 8.8-2.8 2.7-1.9 4.9-4.6 6.4-8.2V28.8h10.8v38.5c0 1.2 0.2 2.1 0.7 2.6 0.5 0.5 1.3 0.8 2.5 0.9v9.2c-1.2 0.2-2.2 0.3-3 0.4 -0.8 0.1-1.6 0.1-2.3 0.1 -4.1-0.3-6.3-2.2-6.9-5.6l-0.2-5.3c-2.3 3.7-5.3 6.6-8.9 8.5C184.4 80.1 180.3 81 175.9 81z" />
            </svg>
          </div>
          <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
        </div>
        <div id="root">${html}</div>
        <script>document.body.className += ' Body--show-preloader';</script>
        <script src="${ASSETS_HOST}${manifest['main.js']}"></script>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\\u003c')}
        </script>
      </body>
    </html>`;
};


export function handleRender(req, res, port, domain) {
  res.send(renderFullPage(undefined, port, domain, req.csrfToken(), {}));
}
