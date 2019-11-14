import './helpers/polyfills';

import React from 'react';
import { render } from 'react-dom';

import { APP_ELEMENT } from './config';
import './helpers/typescript';
import { getMetaContent } from './helpers/arguHelpers';
import LinkDevTools from './helpers/LinkDevTools';
import LinkedRenderStore from './helpers/LinkedRenderStore';
import { handle } from './helpers/logging';
import App from './App';

if (document.documentElement.lang) {
  LinkedRenderStore.store.langPrefs.unshift(document.documentElement.lang);
}

function mount() {
  render(
    <App
      lrs={LinkedRenderStore}
      title={getMetaContent('application-name')}
      website={getMetaContent('website-iri')}
    />,
    document.getElementById(APP_ELEMENT)
  );
}

new Promise((resolve) => {
  if (typeof window.INITIAL__DATA !== 'undefined') {
    const seedRequest = new Response(
      window.INITIAL__DATA,
      { headers: new Headers({ 'Content-Type': 'application/n-quads' }) }
    );

    LinkedRenderStore
      .api
      .feedResponse(seedRequest, true)
      .then(resolve);
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
