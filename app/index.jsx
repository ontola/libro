import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';

import LinkedRenderStore from './helpers/LinkedRenderStore';
import './views';
import IndexContainer from './containers/IndexContainer';
import history from './helpers/history';
import configureStore from './state';

// Removes the rubber banding in iOS
require('inobounce');
require('smoothscroll-polyfill').polyfill();

const store = configureStore();

// Fade out the preloader and fade in the interface
document.getElementsByTagName('body')[0].classList.remove('Body--show-preloader');

const indexContainer = Container => (
  <Container
    Router={ConnectedRouter}
    history={history}
    linkedRenderStore={LinkedRenderStore}
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
