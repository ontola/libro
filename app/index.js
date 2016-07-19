import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { SearchkitProvider, SearchkitManager } from 'searchkit';

import store from './store/configureStore';
import routes from './routes';
import { ELASTICSEARCH_URL } from './constants/config';

const history = syncHistoryWithStore(browserHistory, store);
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
