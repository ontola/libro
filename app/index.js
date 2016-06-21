import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import { SearchkitProvider, SearchkitManager } from 'searchkit';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const sk = new SearchkitManager('/aod_search', {
  initialLoading: true,
});

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
