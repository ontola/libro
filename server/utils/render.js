import HttpStatus from 'http-status-codes';

import { bundles } from '../../bundleConfig';
import * as constants from '../config';

import logging from './logging';
import manifests from './manifest';
import {
  getUserData,
  isModule,
  polyfill,
  preloadingBlock,
} from './render/helpers';
import {
  deferredBodyStyles,
  deferredHeadStyles,
  icons,
  themeBlock,
} from './render/styling';
import { headersFromPrerender } from './render/headersFromPrerender';
import { googleAnalyticsScript, matomoScript } from './tracking';

const version = require('../../webpack/version');

// Due to WebpackPWAManifest not emitting a chunk, the (web) manifest.json file doesn't end up
//  in the assets manifest, so we have to define it manually.

export const renderFullPage = async (ctx, data) => {
  const bundleVersion = isModule(ctx)
    ? bundles.module
    : bundles.legacy;

  const bugsnagOpts = {
    apiKey: constants.bugsnagKey,
    appVersion: version,
    releaseStage: constants.RELEASE_STAGE,
  };
  const csrfToken = ctx.csrf;
  const nonceStr = ctx.res.locals.nonce.toString();
  const [language, isUser] = getUserData(ctx);

  const headers = await headersFromPrerender(ctx, data);

  const { manifest } = ctx;

  /* eslint-disable camelcase */
  const matomoCode = matomoScript(
    manifest.ontola.matomo_hostname,
    manifest.ontola.matomo_port,
    manifest.ontola.matomo_site_id,
    isUser,
    nonceStr
  );

  const googleAnalyticsCode = googleAnalyticsScript(
    manifest.ontola.google_analytics_ua_code,
    nonceStr
  );
  /* eslint-enable camelcase */

  return (
    `<!doctype html>
      <html lang="${language}">
        <head>
          <meta charset="utf-8">
          <link rel="stylesheet" href="/static/preloader.css">
          <link rel="manifest" href="${manifest.scope}/manifest.json">
          ${headers?.title?.toString() || `<title data-rh="true">${manifest.short_name}</title>`}

          <meta name="website-iri" content="${manifest.scope || ''}">
          <meta property="og:type" content="website">
          <meta name="mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="application-name" content="${manifest.short_name}">
          <meta name="apple-mobile-web-app-title" content="${manifest.short_name}">
          <meta name="theme-color" content="${manifest.theme_color}">
          <meta name="msapplication-navbutton-color" content="${manifest.theme_color}">
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
          <meta name="msapplication-starturl" content="${manifest.start_url}">
          <meta name="viewport" content="width=device-width, shrink-to-fit=no, initial-scale=1, maximum-scale=1.0, user-scalable=yes">
          <meta content="269911176456825" property="fb:app_id">
          <meta name="theme" content="${manifest.ontola.css_class}">
          <meta name="template" content="${manifest.ontola.template}">
          <meta name="templateOpts" content="${manifest.ontola.template_options}">
          ${headers?.meta?.toString() || `<meta content="${manifest.short_name}" property="og:title"/>`}

          <meta name="csrf-param" content="authenticity_token">
          <meta name="csrf-token" content="${csrfToken}">
          ${constants.websocketPath ? `<meta name="websocket-path" content="${constants.websocketPath}">` : ''}
          ${constants.bugsnagKey ? '<script async src="https://d2wy8f7a9ursnm.cloudfront.net/v6/bugsnag.min.js"></script>' : ''}
          <meta name="bugsnagConfig" content="${encodeURIComponent(JSON.stringify(bugsnagOpts))}">

          ${headers?.link?.toString() || ''}
          ${icons(ctx)}
          <meta name="msapplication-TileColor" content="${manifest.theme_color}">

          <meta name="msapplication-config" content="/assets/favicons/browserconfig.xml">

          ${deferredHeadStyles(bundleVersion)}
          ${polyfill(bundleVersion, nonceStr)}
        </head>
        <body style="margin: 0;">
          ${themeBlock(ctx)}
          ${preloadingBlock(ctx, nonceStr)}
          <script nonce="${nonceStr}">
            if ('serviceWorker' in navigator) {
               window.addEventListener('load', function() {
                  navigator.serviceWorker.register('${manifest.serviceworker.src}', { scope: '${manifest.serviceworker.scope}/' });
               });
             }
          </script>
          <script id="seed" nonce="${nonceStr}" type="application/hex+x-ndjson">${data?.toString('utf-8') ?? ''}</script>
          <script nonce="${nonceStr}" type="application/javascript">
              var seed = document.getElementById('seed');
              window.INITIAL__DATA = seed ? seed.textContent : '';
          </script>
          <script async crossorigin="anonymous" type="module" src="${constants.ASSETS_HOST}${manifests[bundles.module]['main.js']}"></script>
          <script async nomodule crossorigin="anonymous" type="application/javascript" src="${constants.ASSETS_HOST}${manifests[bundles.legacy]['main.js']}"></script>
          ${(manifests[bundles.module]?.['vendors~main.js'] && `<script async crossorigin="anonymous" type="module" src="${constants.ASSETS_HOST}${manifests[bundles.module]['vendors~main.js']}"></script>`) || ''}
          ${(manifests[bundles.legacy]?.['vendors~main.js'] && `<script async nomodule crossorigin="anonymous" type="application/javascript" src="${constants.ASSETS_HOST}${manifests[bundles.legacy]['vendors~main.js']}"></script>`) || ''}
          ${deferredBodyStyles(nonceStr)}
          <script nonce="${nonceStr}" type="application/javascript">
              window.WEBSITE_META = JSON.parse('${JSON.stringify(manifest.ontola)}')
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
          ${matomoCode}
          ${googleAnalyticsCode}
        </body>
      </html>`
  );
};

export function handleRender(ctx, port, domain, data) {
  return renderFullPage(ctx, data)
    .then((page) => {
      ctx.response.body = page;
    })
    .catch((e) => {
      logging.error(e);
      ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
    });
}
