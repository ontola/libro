import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { App } from './components';
import { Home, Motions, Motion, Politicians, Profile } from './views';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="motions" component={Motions} />
    <Route path="motion/:motionId" component={Motion} />
    <Route path="politicians" component={Politicians} />
    <Route path="profile/:userId" component={Profile} />
  </Route>
);

export default routes;
