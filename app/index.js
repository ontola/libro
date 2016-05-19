import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App } from './components';
import { Home, About } from './pages';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/*" component={Home}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
