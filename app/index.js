import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import motionsApp from './reducers';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App } from './components';
import { Home, Motions, Motion, Politicians, Profile } from './views';

let initialState = {
  appData: [],
  activeMotion: 0
};

const store = createStore(motionsApp, initialState,
  window.devToolsExtension && window.devToolsExtension()
);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="motions" component={Motions} />
        <Route path="motion/:motionId" component={Motion} />
        <Route path="politicians" component={Politicians} />
        <Route path="profile/:userId" component={Profile} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
