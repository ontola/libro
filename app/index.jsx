import './helpers/polyfills';

import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';

import { APP_ELEMENT } from './config';
import './helpers/typescript';
import LinkDevTools from './helpers/LinkDevTools';
import LinkedRenderStore from './helpers/LinkedRenderStore';
import './views';
import IndexContainer from './containers/IndexContainer';
import history from './helpers/history';
import configureStore from './state';

const store = configureStore();

if (document.documentElement.lang) {
  LinkedRenderStore.store.langPrefs.unshift(document.documentElement.lang);
}

function mount() {
  render(
    <IndexContainer
      Router={ConnectedRouter}
      history={history}
      lrs={LinkedRenderStore}
      store={store}
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

    LinkedRenderStore.api
      .feedResponse(seedRequest, true)
      .then(resolve);
  }
})
  .then(mount)
  .catch(mount);

if (typeof window !== 'undefined') {
  window.LRS = LinkedRenderStore;
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    window.dev = new LinkDevTools('');
  }
}

// Fade out the preloader and fade in the interface
const preloaderTimeout = 2500;
document.getElementsByTagName('body')[0].classList.remove('Body--show-preloader');
window.setTimeout(() => {
  ['preloader', 'navbar-preview'].forEach((id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.parentElement.removeChild(elem);
    }
  });
}, preloaderTimeout);
