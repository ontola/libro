import React from 'react';
import { render } from 'react-dom';
import { SearchkitManager } from 'searchkit';
import { AppContainer } from 'react-hot-loader';

import configureStore from './state';
import { ELASTICSEARCH_URL } from './config';
import immutableHistory from './helpers/history';
import IndexContainer from './containers/IndexContainer';
import './views';

// Removes the rubber banding in iOS
require('inobounce');
require('smoothscroll-polyfill').polyfill();

const store = configureStore();
const history = immutableHistory(store);
const sk = new SearchkitManager(ELASTICSEARCH_URL);

if (__DEVELOPMENT__ && module.hot) {
  render(
    <AppContainer>
      <IndexContainer store={store} history={history} sk={sk} />
    </AppContainer>,
    document.getElementById('root')
  );

  module.hot.accept('./containers/IndexContainer', () => {
    const NextIndexContainer = require('./containers/IndexContainer').default; // eslint-disable-line
    render(
      <AppContainer>
        <NextIndexContainer store={store} history={history} sk={sk} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
} else {
  render(
    <IndexContainer store={store} history={history} sk={sk} />,
    document.getElementById('root')
  );
}
