import React from 'react';
import { render } from 'react-dom';
import { SearchkitManager } from 'searchkit';

import configureStore from './store/configureStore';
import { ELASTICSEARCH_URL } from './constants/config';
import { immutableHistory } from './helpers/history';
import IndexContainer from './containers/IndexContainer';

const store = configureStore();
const history = immutableHistory(store);
const sk = new SearchkitManager(ELASTICSEARCH_URL);

render(
  <IndexContainer store={store} history={history} sk={sk} />,
  document.getElementById('root')
);
