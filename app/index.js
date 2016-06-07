import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './configureStore';

import { App } from './components';
import { Home, Motions, Motion, Politicians, Profile } from './views';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="motions" component={Motions} />
        <Route path="motion/:motionId" component={Motion} />
        <Route path="politicians" component={Politicians} />
        <Route path="profile/:userId" component={Profile} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
