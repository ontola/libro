import './helpers/polyfills';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import React from 'react';
import { render } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';

import { APP_ELEMENT } from './config';
import './helpers/typescript';
import { handle } from './helpers/logging';
import LinkDevTools from './helpers/LinkDevTools';
import LinkedRenderStore from './helpers/LinkedRenderStore';
import './views';
import IndexContainer from './containers/IndexContainer';
import history from './helpers/history';
import configureStore from './state';

if (__PRODUCTION__) {
  try {
    LogRocket.init('argu/aod');
    setupLogRocketReact(LogRocket);
  } catch (e) {
    handle(e);
  }
}

const store = configureStore();

if (document.documentElement.lang) {
  LinkedRenderStore.store.langPrefs.unshift(document.documentElement.lang);
}

render(
  <IndexContainer
    Router={ConnectedRouter}
    history={history}
    lrs={LinkedRenderStore}
    store={store}
  />,
  document.getElementById(APP_ELEMENT)
);

if (typeof window !== 'undefined') {
  window.LRS = LinkedRenderStore;
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    window.dev = new LinkDevTools('');
  }
}

// Fade out the preloader and fade in the interface
document.getElementsByTagName('body')[0].classList.remove('Body--show-preloader');
