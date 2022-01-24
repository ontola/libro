import './helpers/polyfills';
import './useFactory';

import enableDevtools from '@ontola/link-devtools';
import React from 'react';
import { render } from 'react-dom';

import { AppContextProvider } from './AppContextProvider';
import { APP_ELEMENT } from './config';
import { defaultManifest } from './helpers/defaultManifest';
import './helpers/typescript';
import generateLRS from './helpers/generateLRS';
import { log } from './helpers/logging';
import App from './App';
import patchRequestInitGenerator from './helpers/monkey';
import { seedToSlice } from './helpers/seed';
import { WebManifest } from './WebManifest';

const getWebsiteManifest = (): WebManifest => {
  if (!__CLIENT__
    || typeof window.WEBSITE_MANIFEST === 'undefined'
    || Object.keys(window.WEBSITE_MANIFEST).length === 0) {
    return defaultManifest(window.location.origin);
  }

  return window.WEBSITE_MANIFEST;
};

(async function boot() {
  log('Booting');

  const manifest = getWebsiteManifest();

  const {
    lrs,
    history,
  } = await generateLRS(manifest, seedToSlice(window.INITIAL__DATA));
  patchRequestInitGenerator(lrs);

  if (document.documentElement.lang) {
    (lrs.store as any).langPrefs.unshift(document.documentElement.lang);
  }

  function mount() {
    log('Mounting app');

    render(
      <AppContextProvider
        lrs={lrs}
        manifest={manifest}
      >
        <App history={history} />
      </AppContextProvider>,
      document.getElementById(APP_ELEMENT),
    );
  }

  mount();

  if (typeof window !== 'undefined') {
    enableDevtools(lrs);
    window.LRS = lrs;
  }

  // Fade out the preloader and fade in the interface
  const preloaderTimeout = 2500;
  document.body.className = document.body.className.replace('Body--show-preloader', '');
  window.setTimeout(() => {
    ['preloader', 'navbar-preview'].forEach((id) => {
      const elem = document.getElementById(id);

      if (elem) {
        elem.parentElement?.removeChild(elem);
      }
    });
    document.getElementById(APP_ELEMENT)?.classList?.remove('preloader-fixed');
  }, preloaderTimeout);
}());
