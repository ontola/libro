import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import useragent from 'useragent';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import getApp from '../../app/App';
import generateLRS from '../../app/helpers/generateLRS';
import spinner from '../../app/helpers/spinner';
import { bundles, moduleBrowserVersions } from '../../bundleConfig';
import pjson from '../../package.json';
import * as constants from '../config';

import logging from './logging';
import manifests from './manifest';

function isModule(header) {
  const agent = useragent.is(header);

  return !(
    agent.ie
    || (agent.chrome && agent.version >= moduleBrowserVersions.chrome)
    || (agent.safari && agent.version >= moduleBrowserVersions.safari)
    || (agent.ios && agent.version >= moduleBrowserVersions.ios)
    || (agent.firefox && agent.version >= moduleBrowserVersions.firefox)
    || (agent.edge && agent.version >= moduleBrowserVersions.edge)
    || (agent.opera && agent.version >= moduleBrowserVersions.opera)
  );
}

const requiredFeatures = [
  'default',
  'Array.prototype.findIndex',
  'Array.prototype.find',
  'Array.prototype.includes',
  'Array.prototype.values',
  'fetch',
  'DOMTokenList',
  'Intl|always|gated',
  'Intl.~en-US|always|gated',
  'Intl.~nl-NL|always|gated',
  'Number.isFinite',
  'Number.isInteger',
  'Number.MAX_SAFE_INTEGER',
  'Number.parseInt',
  'Number.parseFloat',
  'Object.entries',
  'Object.values',
  'Promise',
  'Promise.prototype.finally|gated',
  'Symbol',
];
const polyfillSrc = `https://cdn.polyfill.io/v2/polyfill.js?unknown=polyfill&features=${requiredFeatures.join(',')}`;
const deferredStyles = '    var loadDeferredStyles = function() {\n'
  + '        var addStylesNode = document.getElementById(\'deferred-styles\');\n'
  + '        var replacement = document.createElement("div");\n'
  + '        replacement.innerHTML = addStylesNode.textContent;\n'
  + '        document.body.appendChild(replacement);\n'
  + '        addStylesNode.parentElement.removeChild(addStylesNode);\n'
  + '    };\n'
  + '    var raf = requestAnimationFrame || mozRequestAnimationFrame ||\n'
  + '      webkitRequestAnimationFrame || msRequestAnimationFrame;\n'
  + '    if (raf) raf(function() {window.setTimeout(loadDeferredStyles, 0);});\n'
  + '    else window.addEventListener(\'load\', loadDeferredStyles);\n';

// Due to WebpackPWAManifest not emitting a chunk, the (web) manifest.json file doesn't end up
//  in the assets manifest, so we have to define it manually.
const manifestLocation = `${constants.ASSETS_HOST}/manifest.json`;

export const renderFullPage = (req, res, websiteMeta, data) => {
  const bundleVersion = isModule(req.headers['user-agent'])
    ? bundles.module
    : bundles.legacy;
  const manifest = manifests[bundleVersion];

  const bundleCSS = __DEVELOPMENT__
    ? ''
    : `<link crossorigin="anonymous" rel="stylesheet" type="text/css" href="${constants.ASSETS_HOST}${manifest['main.css']}" />`;

  const bugsnagOpts = {
    apiKey: constants.bugsnagKey,
    appVersion: pjson.version,
    releaseStage: constants.STAGE,
  };
  const csrfToken = req.csrfToken();
  const nonceStr = res.locals.nonce.toString();
  let language = '';
  try {
    const tokenPayload = jwt.verify(
      req.session.arguToken.accessToken,
      constants.jwtEncryptionToken
    );
    ({ language } = tokenPayload.user);
  } catch (e) {
    logging.error(e);
  }

  const polyfill = bundleVersion === 'legacy' ? `<script crossorigin="anonymous" nonce="${nonceStr}" src="${polyfillSrc}"></script>` : '';

  const { LRS } = generateLRS();
  const App = getApp(LRS);
  const { origin } = new URL(websiteMeta?.website || `${req.protocol}://${req.host}`);
  const resourceIRI = req.path?.length > 1 ? origin + req.path : origin;
  const seedRequest = {
    body: data?.toString('utf-8') ?? '',
    headers: { 'Content-Type': 'application/n-quads' },
    status: 200,
  };

  return LRS
    .api
    .feedResponse(seedRequest, true)
    .then(() => {
      const helmetContext = {};
      ReactDOMServer.renderToStaticMarkup(React.createElement(
        App,
        {
          helmetContext,
          location: resourceIRI,
          website: websiteMeta.website,
        }
      ));
      const { helmet: headers } = helmetContext;

      return (
        `<!doctype html>
          <html lang="${language}">
            <head>
              <meta charset="utf-8">
              <link rel="stylesheet" href="/static/preloader.css">
              <link rel="manifest" href="${manifestLocation}">
              ${headers?.title?.toString()}
      
              <meta name="website-iri" content="${websiteMeta.website || ''}">
              <meta property="og:type" content="website">
              <meta name="mobile-web-app-capable" content="yes">
              <meta name="apple-mobile-web-app-capable" content="yes">
              <meta name="application-name" content="${websiteMeta.title}">
              <meta name="apple-mobile-web-app-title" content="${websiteMeta.title}">
              <meta name="theme-color" content="#60707F">
              <meta name="msapplication-navbutton-color" content="#60707F">
              <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
              <meta name="msapplication-starturl" content="/">
              <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1, maximum-scale=1.0, user-scalable=yes">
              <meta content="269911176456825" property="fb:app_id">
              <meta name="theme" content="${websiteMeta.cssClass}">
              ${headers?.meta?.toString()}
      
              <meta name="csrf-param" content="authenticity_token">
              <meta name="csrf-token" content="${csrfToken}">
              ${constants.websocketPath ? `<meta name="websocket-path" content="${constants.websocketPath}">` : ''}
              ${constants.bugsnagKey ? '<script async src="//d2wy8f7a9ursnm.cloudfront.net/v5/bugsnag.min.js"></script>' : ''}
              <script nonce="${nonceStr}">window.bugsnagClient = typeof bugsnag !== 'undefined' && bugsnag(${JSON.stringify(bugsnagOpts)})</script>
      
              ${headers?.link?.toString()}
              <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicons/favicon-192x192.png">
              <link rel="icon" type="image/png" sizes="160x160" href="/assets/favicons/favicon-160x160.png">
              <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicons/favicon-96x96.png">
              <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png">
              <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png">
              <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/assets/favicons/favicon-192x192.png">
              <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/assets/favicons/apple-touch-icon-180x180.png">
              <link rel="icon" type="image/png" sizes="120x120" href="/assets/favicons/apple-touch-icon-120x120.png">
              <link rel="apple-touch-icon" type="image/png" sizes="128x128" href="/assets/icon-medium.png">
              <link rel="icon" type="image/png" sizes="72x72" href="/assets/favicons/apple-touch-icon-72x72.png">
              <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/assets/favicons/apple-touch-icon-72x72.png">
              <meta name="msapplication-TileColor" content="#475668">
              <meta name="msapplication-TileImage" content="/assets/favicons/mstile-310x310.png">
              <meta name="msapplication-config" content="/assets/favicons/browserconfig.xml">
              
              <noscript id="deferred-styles">
                  ${bundleCSS}
                  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
                  <link crossorigin="anonymous" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
              </noscript>
              ${polyfill}
            </head>
            <body style="margin: 0;">
              <style id="theme-config">
                :root {
                  --accent-background-color:${websiteMeta.secondaryMain}; 
                  --accent-color:${websiteMeta.secondaryText}; 
                  --navbar-background:${websiteMeta.primaryMain}; 
                  --navbar-color:${websiteMeta.primaryText}; 
                  --navbar-color-hover:${websiteMeta.primaryText}12; 
                }
                .accent-background-color {
                  background-color: ${websiteMeta.secondaryMain};
                }
                .accent-color {
                  color: ${websiteMeta.secondaryText};
                }
                .navbar-background {
                  background: ${websiteMeta.primaryMain};
                }
                .navbar-color {
                  color: ${websiteMeta.primaryText};
                }
              </style>
              <div class="preloader" id="preloader">
                ${spinner}
              </div>
              <div 
                  id="navbar-preview" 
                  class="accent-background-color navbar-background navbar-color"
                  style="height: 3.2rem; z-index: -1;"
              ></div>
              <div id="${constants.APP_ELEMENT}" class="${websiteMeta.cssClass}"></div>
              <noscript>
                  <h1>Argu heeft javascript nodig om te werken</h1>
                  <p>Javascript staat momenteel uitgeschakeld, probeer een andere browser of in prive modus.</p>
              </noscript>
              <script nonce="${nonceStr}">document.body.className = (document.body.className || '') + ' Body--show-preloader';</script>
              <script nonce="${nonceStr}">
                if ('serviceWorker' in navigator) {
                   window.addEventListener('load', function() {
                      navigator.serviceWorker.register('/sw.js');
                   });
                 }
              </script>
              <script async crossorigin="anonymous" type="module" src="${constants.ASSETS_HOST}${manifests[bundles.module]['main.js']}"></script>
              <script async nomodule crossorigin="anonymous" type="application/javascript" src="${constants.ASSETS_HOST}${manifests[bundles.legacy]['main.js']}"></script>
              ${(manifests[bundles.module]?.['vendors~main.js'] && `<script async crossorigin="anonymous" type="module" src="${constants.ASSETS_HOST}${manifests[bundles.module]['vendors~main.js']}"></script>`) || ''}
              ${(manifests[bundles.legacy]?.['vendors~main.js'] && `<script async nomodule crossorigin="anonymous" type="application/javascript" src="${constants.ASSETS_HOST}${manifests[bundles.legacy]['vendors~main.js']}"></script>`) || ''}
              <script async nonce="${nonceStr}">
                  ${deferredStyles}
              </script>
              <script id="seed" nonce="${nonceStr}" type="application/n-quads">${data?.toString('utf-8') ?? ''}</script>
              <script nonce="${nonceStr}" type="application/javascript">
                  var seed = document.getElementById('seed');
                  window.INITIAL__DATA = seed ? seed.textContent : '';
              </script>
              <script nonce="${nonceStr}" type="application/javascript">
                  window.WEBSITE_META = JSON.parse('${JSON.stringify(websiteMeta)}')
              </script>
            </body>
          </html>`
      );
    });
};

export function handleRender(req, res, port, domain, websiteMeta, data) {
  return renderFullPage(req, res, websiteMeta, data)
    .then((page) => {
      res.send(page);
    })
    .catch((e) => {
      logging.error(e);
      res.status(INTERNAL_SERVER_ERROR).end();
    });
}
