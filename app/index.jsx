import './helpers/polyfills';
import './useFactory';

import React from 'react';
import { render } from 'react-dom';
import LinkDevTools from '@ontola/link-devtools';

import { APP_ELEMENT } from './config';
import './helpers/typescript';
import { getMetaContent } from './helpers/arguHelpers';
import LinkedRenderStore from './helpers/LinkedRenderStore';
import { handle, log } from './helpers/logging';
import App from './App';

log('Booting');

if (document.documentElement.lang) {
  LinkedRenderStore.store.langPrefs.unshift(document.documentElement.lang);
}

const BOOT_TIMEOUT = 10000;
let timeout;
function mount() {
  log('Mounting app');
  if (typeof window !== 'undefined') {
    window.clearTimeout(timeout);
  }

  render(
    <App
      lrs={LinkedRenderStore}
      title={getMetaContent('application-name')}
      website={getMetaContent('website-iri')}
    />,
    document.getElementById(APP_ELEMENT)
  );
}

new Promise((resolve, reject) => {
  if (typeof window.INITIAL__DATA !== 'undefined') {
    log('Seeding LRS');
    const seedRequest = new Response(
      window.INITIAL__DATA,
      { headers: new Headers({ 'Content-Type': 'application/hex+x-ndjson' }) }
    );

    timeout = window.setTimeout(() => {
      handle(new Error('Forced mount'));
      mount();
    }, BOOT_TIMEOUT);

    LinkedRenderStore
      .api
      .feedResponse(seedRequest, true)
      .then(resolve)
      .catch(reject);
  } else {
    throw new Error(`No seed data present (was '${typeof window.INITIAL__DATA}')`);
  }
})
  .then(mount)
  .catch((e) => {
    handle(e);
    mount();
  });

if (typeof window !== 'undefined') {
  window.LRS = LinkedRenderStore;
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    window.dev = new LinkDevTools('');
  }
}

// Fade out the preloader and fade in the interface
const preloaderTimeout = 2500;
document.body.className = document.body.className.replace('Body--show-preloader', '');
window.setTimeout(() => {
  ['preloader', 'navbar-preview'].forEach((id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.parentElement.removeChild(elem);
    }
  });
  document.getElementById(APP_ELEMENT).classList.remove('preloader-fixed');
}, preloaderTimeout);
