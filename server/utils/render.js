import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import useragent from 'useragent';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../../app/App';
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

export const renderFullPage = (req, res, manifestData, data) => {
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
  const { origin } = new URL(manifestData?.scope || `${req.protocol}://${req.host}`);
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
          lrs: LRS,
          website: manifestData.scope,
        }
      ));
      const { helmet: headers } = helmetContext;
      const icons = manifestData?.icons?.map((icon) => {
        if (icon.src.includes('favicon')) {
          return `<link rel="icon" type="${icon.type}" sizes="${icon.sizes}" href="${icon.src}">`;
        } else if (icon.src.includes('apple-touch-icon')) {
          return `<link rel="apple-touch-icon" type="${icon.type}" sizes="${icon.sizes}" href="${icon.src}">`;
        } else if (icon.src.includes('mstile-310x310.png')) {
          return `<meta name="msapplication-TileImage" content="${icon.src}">`;
        }

        return null;
      })?.filter(Boolean)?.join('\n');

      return (
        `<!doctype html>
          <html lang="${language}">
            <head>
              <meta charset="utf-8">
              <link rel="stylesheet" href="/static/preloader.css">
              <link rel="manifest" href="${manifestData.scope}/manifest.json">
              ${headers?.title?.toString()}

              <meta name="website-iri" content="${manifestData.scope || ''}">
              <meta property="og:type" content="website">
              <meta name="mobile-web-app-capable" content="yes">
              <meta name="apple-mobile-web-app-capable" content="yes">
              <meta name="application-name" content="${manifestData.short_name}">
              <meta name="apple-mobile-web-app-title" content="${manifestData.short_name}">
              <meta name="theme-color" content="${manifestData.theme_color}">
              <meta name="msapplication-navbutton-color" content="${manifestData.theme_color}">
              <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
              <meta name="msapplication-starturl" content="${manifestData.start_url}">
              <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1, maximum-scale=1.0, user-scalable=yes">
              <meta content="269911176456825" property="fb:app_id">
              <meta name="theme" content="${manifestData.ontola.css_class}">
              <meta name="template" content="${manifestData.ontola.template}">
              <meta name="templateOpts" content="${manifestData.ontola.template_options}">
              ${headers?.meta?.toString()}

              <meta name="csrf-param" content="authenticity_token">
              <meta name="csrf-token" content="${csrfToken}">
              ${constants.websocketPath ? `<meta name="websocket-path" content="${constants.websocketPath}">` : ''}
              ${constants.bugsnagKey ? '<script async src="//d2wy8f7a9ursnm.cloudfront.net/v5/bugsnag.min.js"></script>' : ''}
              <script nonce="${nonceStr}">window.bugsnagClient = typeof bugsnag !== 'undefined' && bugsnag(${JSON.stringify(bugsnagOpts)})</script>

              ${headers?.link?.toString()}
              ${icons}
              <meta name="msapplication-TileColor" content="${manifestData.theme_color}">
              
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
                  --accent-background-color:${manifestData.ontola.secondary_main};
                  --accent-color:${manifestData.ontola.secondary_text};
                  --navbar-background:${manifestData.ontola.primary_main};
                  --navbar-color:${manifestData.ontola.primary_text};
                  --navbar-color-hover:${manifestData.ontola.primary_text}12;
                }
                .accent-background-color {
                  background-color: ${manifestData.ontola.secondary_main};
                }
                .accent-color {
                  color: ${manifestData.ontola.secondary_text};
                }
                .navbar-background {
                  background: ${manifestData.ontola.primary_main};
                }
                .navbar-color {
                  color: ${manifestData.ontola.primary_text};
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
              <div id="${constants.APP_ELEMENT}" class="${manifestData.ontola.css_class} preloader-fixed"></div>
              <noscript>
                  <h1>Argu heeft javascript nodig om te werken</h1>
                  <p>Javascript staat momenteel uitgeschakeld, probeer een andere browser of in prive modus.</p>
              </noscript>
              <script nonce="${nonceStr}">document.body.className = (document.body.className || '') + ' Body--show-preloader';</script>
              <script nonce="${nonceStr}">
                if ('serviceWorker' in navigator) {
                   window.addEventListener('load', function() {
                      navigator.serviceWorker.register('${manifestData.serviceworker.src}', { scope: ${manifestData.serviceworker.scope} });
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
                  window.WEBSITE_META = JSON.parse('${JSON.stringify(manifestData.ontola)}')
              </script>
              <!-- Tell users their browser is outdated https://browser-update.org/#install -->
              <script nonce="${nonceStr}">
                  var $buoop = {required:{e:-4,f:-3,o:-3,s:-1,c:-3},insecure:true,api:2019.07 };
                  function $buo_f(){
                  var e = document.createElement("script");
                  e.src = "https://browser-update.org/update.min.js";
                  document.body.appendChild(e);
                  };
                  try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
                  catch(e){window.attachEvent("onload", $buo_f)}
              </script>
            </body>
          </html>`
      );
    });
};

export function handleRender(req, res, port, domain, manifestData, data) {
  return renderFullPage(req, res, manifestData, data)
    .then((page) => {
      res.send(page);
    })
    .catch((e) => {
      logging.error(e);
      res.status(INTERNAL_SERVER_ERROR).end();
    });
}
