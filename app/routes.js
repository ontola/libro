import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from './components';
import {
  Document,
  Home,
  Motions,
  Motion,
  Politicians,
  Profile,
  Search,
} from './views';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="motions" component={Motions} />
    <Route path="motion/:motionId" component={Motion} />
    <Route path="politicians" component={Politicians} />
    <Route path="profile/:userId" component={Profile} />
    <Route path="search" component={Search} />
    <Route path="doc/:docId" component={Document} />
  </Route>
);

export default routes;
