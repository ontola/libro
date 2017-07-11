import React from 'react';
import { render } from 'react-dom';
import { SearchkitManager } from 'searchkit';
import { AppContainer } from 'react-hot-loader';

import IndexContainer from './containers/IndexContainer';
import immutableHistory from './helpers/history';
import LinkedRenderStore from './helpers/LinkedRenderStore';
import configureStore from './state';
import './views';

// Removes the rubber banding in iOS
require('inobounce');
require('smoothscroll-polyfill').polyfill();

const store = configureStore();
const history = immutableHistory(store);
const sk = new SearchkitManager('/aod_search');

// Fade out the preloader and fade in the interface
document.getElementsByTagName('body')[0].classList.remove('Body--show-preloader');

const indexContainer = Container => (
  <Container
    history={history}
    linkedRenderStore={LinkedRenderStore}
    sk={sk}
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
