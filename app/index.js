import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import motionsApp from './reducers';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App } from './components';
import * as Views from './views';

let initialState = {
  data: [],
  activeMotion: 0
};

const store = createStore(motionsApp, initialState,
  window.devToolsExtension && window.devToolsExtension()
);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Views.Home}/>
        <Route path="motions" component={Views.Motions} />
        <Route path="motion/:motionId" component={Views.Motion} />
        <Route path="politicians" component={Views.Politicians} />
        <Route path="profile/:userId" component={Views.Profile} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
