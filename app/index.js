import React from 'react';
import { render } from 'react-dom';
import { SearchkitManager } from 'searchkit';
import { AppContainer } from 'react-hot-loader';

import configureStore from './state';
import { ELASTICSEARCH_URL } from './config';
import { immutableHistory } from './helpers/history';
import IndexContainer from './containers/IndexContainer';

const store = configureStore();
const history = immutableHistory(store);
const sk = new SearchkitManager(ELASTICSEARCH_URL);

render(
  <AppContainer>
    <IndexContainer store={store} history={history} sk={sk} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/IndexContainer', () => {
    const NextIndexContainer = require('./containers/IndexContainer').default; // eslint-disable-line
    render(
      <AppContainer>
        <NextIndexContainer store={store} history={history} sk={sk} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
