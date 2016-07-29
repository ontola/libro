import React from 'react';
import { render } from 'react-dom';
import { SearchkitManager } from 'searchkit';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import { ELASTICSEARCH_URL } from './constants/config';
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
    const NextAppContainer = require('./containers/IndexContainer').default;
    render(
      <AppContainer>
        <NextAppContainer store={store} history={history} sk={sk} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
