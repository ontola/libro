import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { SearchkitProvider, SearchkitManager } from 'searchkit';

import configureStore from './store/configureStore';
import routes from './routes';
import { immutableHistory } from './helpers/history';
import { ELASTICSEARCH_URL } from './constants/config';

const store = configureStore();
const history = immutableHistory(store);
const sk = new SearchkitManager(ELASTICSEARCH_URL);

class Index extends React.Component {
  getChildContext() {
    return { searchkit: sk };
  }

  render() {
    return (
      <Provider store={store}>
        <SearchkitProvider searchkit={sk}>
          <Router history={history} routes={routes} />
        </SearchkitProvider>
      </Provider>
    );
  }
}

Index.childContextTypes = {
  searchkit: React.PropTypes.object,
};

render(<Index />, document.getElementById('root'));
