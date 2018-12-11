import './helpers/polyfills';

import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router/immutable';

import { APP_ELEMENT } from './config';
import './helpers/typescript';
import { handle } from './helpers/logging';
import LinkDevTools from './helpers/LinkDevTools';
import LinkedRenderStore from './helpers/LinkedRenderStore';
import './helpers/serviceWorkerCommunicator';
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

const indexContainer = Container => (
  <Container
    Router={ConnectedRouter}
    history={history}
    lrs={LinkedRenderStore}
    store={store}
  />
);

if (document.documentElement.lang) {
  LinkedRenderStore.store.langPrefs.unshift(document.documentElement.lang);
}

if (__DEVELOPMENT__ && module.hot) {
  render(
    <AppContainer>
      {indexContainer(IndexContainer)}
    </AppContainer>,
    document.getElementById(APP_ELEMENT)
  );

  module.hot.accept('./containers/IndexContainer', () => {
    const NextIndexContainer = require('./containers/IndexContainer').default; // eslint-disable-line
    render(
      <AppContainer>
        {indexContainer(NextIndexContainer)}
      </AppContainer>,
      document.getElementById(APP_ELEMENT)
    );
  });
} else {
  render(
    indexContainer(IndexContainer),
    document.getElementById(APP_ELEMENT)
  );
}

if (typeof window !== 'undefined') {
  window.LRS = LinkedRenderStore;
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
    window.dev = new LinkDevTools('');
  }
}

// Fade out the preloader and fade in the interface
document.getElementsByTagName('body')[0].classList.remove('Body--show-preloader');
