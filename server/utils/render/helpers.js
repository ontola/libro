import useragent from 'useragent';

import spinner from '../../../app/helpers/spinner';
import { moduleBrowserVersions } from '../../../bundleConfig';
import * as constants from '../../config';

import { navbarBackground, navbarColor } from './styling';

const requiredFeatures = [
  'default',
  'Array.prototype.findIndex',
  'Array.prototype.find',
  'Array.prototype.includes',
  'Array.prototype.values',
  'fetch',
  'DOMTokenList',
  'Intl',
  'Intl.~en-US',
  'Intl.~nl-NL',
  'Intl.RelativeTimeFormat',
  'Intl.RelativeTimeFormat.~locale.en',
  'Intl.RelativeTimeFormat.~locale.nl',
  'Number.isFinite',
  'Number.isInteger',
  'Number.MAX_SAFE_INTEGER',
  'Number.parseInt',
  'Number.parseFloat',
  'Object.entries',
  'Object.values',
  'Promise',
  'Promise.prototype',
  'Symbol',
  'Symbol.iterator',
  'Symbol.for',
];

const polyfillSrc = `https://cdn.polyfill.io/v3/polyfill.min.js?features=${requiredFeatures.join(',')}&flags=gated`;

export const getUserData = (ctx) => {
  const user = ctx.getFromAccessToken('user');
  if (!user) {
    return [null, false];
  }
  const { language, type } = user;

  return [language, type === 'user'];
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
      style="background: ${navbarBackground(ctx)}; color: ${navbarColor(ctx)}; height: 3.2rem; z-index: -1;"
  ></div>
  <div id="${constants.APP_ELEMENT}" class="${ctx.manifest.ontola.theme} preloader-fixed"></div>
  <noscript>
      <h1>Argu heeft javascript nodig om te werken</h1>
      <p>Javascript staat momenteel uitgeschakeld, probeer een andere browser of in prive modus.</p>
  </noscript>
  <script nonce="${nonceStr}">document.body.className = (document.body.className || '') + ' Body--show-preloader';</script>
`;
