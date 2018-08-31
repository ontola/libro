import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router/immutable';

import LinkDevTools from './helpers/LinkDevTools';
import LinkedRenderStore from './helpers/LinkedRenderStore';
import './views';
import IndexContainer from './containers/IndexContainer';
import history from './helpers/history';
import configureStore from './state';

// Removes the rubber banding in iOS
require('inobounce');
require('smoothscroll-polyfill').polyfill();

if (__PRODUCTION__) {
  try {
    LogRocket.init('argu/aod');
    setupLogRocketReact(LogRocket);
  } catch (e) {
    if (window.bugsnagClient !== undefined) {
      window.bugsnagClient.notify(e);
    } else {
      // eslint-disable-next-line no-console
      console.error(e);
    }
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

if (__DEVELOPMENT__ && module.hot) {
  render(
    <AppContainer>
      {indexContainer(IndexContainer)}
    </AppContainer>,
    document.getElementById('root')
  );

  module.hot.accept('./containers/IndexContainer', () => {
    const NextIndexContainer = require('./containers/IndexContainer').default; // eslint-disable-line
    render(
      <AppContainer>
        {indexContainer(NextIndexContainer)}
      </AppContainer>,
      document.getElementById('root')
    );
  });
} else {
  render(
    indexContainer(IndexContainer),
    document.getElementById('root')
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
