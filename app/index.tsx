import './helpers/polyfills';
import './modules/Common/lib/typescript';
import './useFactory';

import enableDevtools from '@ontola/link-devtools';
import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import { APP_ELEMENT } from './config';
import { defaultManifest } from './helpers/defaultManifest';
import generateLRS from './helpers/generateLRS';
import { log } from './helpers/logging';
import patchRequestInitGenerator from './helpers/monkey';
import { modules } from './modules';
import { seedToSlice } from './modules/Common/lib/seed';
import { WebManifest } from './modules/Kernel/components/AppContext/WebManifest';
import { AppContextEditor } from './modules/Studio/components/AppContextEditor';

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
    history,
    lrs,
  } = await generateLRS(
    manifest,
    modules,
    seedToSlice(window.INITIAL__DATA, manifest.ontola.website_iri, window.EMP_SYMBOL_MAP),
    window.EMP_SYMBOL_MAP,
  );
  patchRequestInitGenerator(lrs);

  if (document.documentElement.lang) {
    (lrs.store as any).langPrefs.unshift(document.documentElement.lang);
  }

  function mount() {
    log('Mounting app');

    render(
      <AppContextEditor
        lrs={lrs}
        manifest={manifest}
        modules={modules}
      >
        <App
          history={history}
          modules={modules}
        />
      </AppContextEditor>,
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
