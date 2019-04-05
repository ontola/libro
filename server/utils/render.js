import jwt from 'jsonwebtoken';
import useragent from 'useragent';

import { bundles, moduleBrowserVersions } from '../../bundleConfig';
import pjson from '../../package.json';
import * as constants from '../config';

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

export const renderFullPage = (domain, req, res, websiteMeta, data) => {
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
  const tokenPayload = jwt.verify(
    req.session.arguToken.accessToken,
    constants.jwtEncryptionToken
  );
  const { language } = tokenPayload.user;

  const polyfill = bundleVersion === 'legacy' ? `<script crossorigin="anonymous" nonce="${nonceStr}" src="${polyfillSrc}"></script>` : '';

  return `<!doctype html>
    <html lang="${language}">
      <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="/static/preloader.css" />
        <link rel="manifest" href="${constants.ASSETS_HOST}${manifest['manifest.json']}">
        <title>Argu</title>

        <meta name="website-iri" content="${websiteMeta.website || ''}" />
        <meta property="og:type" content="website" />
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="application-name" content="Argu">
        <meta name="apple-mobile-web-app-title" content="Argu">
        <meta name="theme-color" content="#60707F">
        <meta name="msapplication-navbutton-color" content="#60707F">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="msapplication-starturl" content="/">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=5.0" />
        <meta content="269911176456825" property="fb:app_id">

        <meta name="csrf-param" content="authenticity_token">
        <meta name="csrf-token" content="${csrfToken}">
        ${constants.bugsnagKey ? '<script async src="//d2wy8f7a9ursnm.cloudfront.net/v5/bugsnag.min.js"></script>' : ''}
        <script nonce="${nonceStr}">window.bugsnagClient = typeof bugsnag !== 'undefined' && bugsnag(${JSON.stringify(bugsnagOpts)})</script>

        <link rel="icon" type="image/png" sizes="192x192" href="/static/favicons/favicon-192x192.png">
        <link rel="icon" type="image/png" sizes="160x160" href="/static/favicons/favicon-160x160.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/static/favicons/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png">
        <link rel="apple-touch-icon" type="image/png" sizes="192x192" href="/static/favicons/favicon-192x192.png">
        <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/static/favicons/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="120x120" href="/static/favicons/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" type="image/png" sizes="128x128" href="/static/icon-medium.png">
        <link rel="icon" type="image/png" sizes="72x72" href="/static/favicons/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" type="image/png" sizes="72x72" href="/static/favicons/apple-touch-icon-72x72.png">
        <meta name="msapplication-TileColor" content="#475668">
        <meta name="msapplication-TileImage" content="/static/favicons/mstile-310x310.png">
        <meta name="msapplication-config" content="/static/favicons/browserconfig.xml">
        
        <noscript id="deferred-styles">
            ${bundleCSS}
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
            <link crossorigin="anonymous" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        </noscript>
        ${polyfill}
      </head>
      <body>
        <style id="theme-config">
          :root {
            --accent-background-color:${websiteMeta.accentBackgroundColor}; 
            --accent-color:${websiteMeta.accentColor}; 
            --navbar-background:${websiteMeta.navbarBackground}; 
            --navbar-color:${websiteMeta.navbarColor}; 
            --navbar-color-hover:${websiteMeta.navbarColor}12; 
          }
          .accent-background-color {
            background-color: ${websiteMeta.accentBackgroundColor};
          }
          .accent-color {
            color: ${websiteMeta.accentColor};
          }
          .navbar-background {
            background: ${websiteMeta.navbarBackground};
          }
          .navbar-color {
            color: ${websiteMeta.navbarColor};
          }
        </style>
        <div class="preloader" id="preloader">
          <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
          </div>
        </div>
        <div 
            id="navbar-preview" 
            class="accent-background-color navbar-background navbar-color"
            style="height: 3.2rem; z-index: -1;"
        ></div>
        <div id="${constants.APP_ELEMENT}"></div>
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
      </body>
    </html>`;
};

export function handleRender(req, res, port, domain, websiteMeta, data) {
  res.send(renderFullPage(domain, req, res, websiteMeta, data));
}
