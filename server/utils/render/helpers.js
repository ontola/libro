import jwt from 'jsonwebtoken';
import useragent from 'useragent';

import spinner from '../../../app/helpers/spinner';
import { moduleBrowserVersions } from '../../../bundleConfig';
import * as constants from '../../config';
import logging from '../logging';

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
  'Symbol.iterator',
];

const polyfillSrc = `https://cdn.polyfill.io/v2/polyfill.js?unknown=polyfill&features=${requiredFeatures.join(',')}`;

export const getUserData = (ctx) => {
  try {
    const { user: { language, type } } = jwt.verify(
      ctx.session.arguToken.accessToken,
      constants.jwtEncryptionToken
    );

    return [language, type === 'user'];
  } catch (e) {
    logging.error(e);

    return [null, false];
  }
};

export const isModule = (ctx) => {
  const agent = useragent.is(ctx.request.headers['user-agent']);

  return !(
    agent.ie
    || (agent.chrome && agent.version >= moduleBrowserVersions.chrome)
    || (agent.safari && agent.version >= moduleBrowserVersions.safari)
    || (agent.ios && agent.version >= moduleBrowserVersions.ios)
    || (agent.firefox && agent.version >= moduleBrowserVersions.firefox)
    || (agent.edge && agent.version >= moduleBrowserVersions.edge)
    || (agent.opera && agent.version >= moduleBrowserVersions.opera)
  );
};

export const polyfill = (bundleVersion, nonceStr) => {
  if (bundleVersion !== 'legacy') {
    return '';
  }

  return `<script crossorigin="anonymous" nonce="${nonceStr}" src="${polyfillSrc}"></script>`;
};

export const preloadingBlock = (ctx, nonceStr) => `
  <div class="preloader" id="preloader">${spinner}</div>
  <div
      id="navbar-preview"
      class="accent-background-color navbar-background navbar-color"
      style="height: 3.2rem; z-index: -1;"
  ></div>
  <div id="${constants.APP_ELEMENT}" class="${ctx.manifest.ontola.css_class} preloader-fixed"></div>
  <noscript>
      <h1>Argu heeft javascript nodig om te werken</h1>
      <p>Javascript staat momenteel uitgeschakeld, probeer een andere browser of in prive modus.</p>
  </noscript>
  <script nonce="${nonceStr}">document.body.className = (document.body.className || '') + ' Body--show-preloader';</script>
`;
