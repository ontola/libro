import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from './components';
import MotionContainer from './containers/MotionContainer';
import {
  Document,
  Home,
  Motions,
  NotFound,
  Politicians,
  Profile,
  Search,
  UserMotions,
  UserStats,
} from './views';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="motions" component={Motions} />
    <Route path="motion/:motionId" component={MotionContainer} />
    <Route path="politicians" component={Politicians} />
    <Route path="profile/:userId" component={Profile}>
      <IndexRoute component={UserMotions} />
      <Route path="stats" component={UserStats} />
    </Route>
    <Route path="search" component={Search} />
    <Route path="doc/:docId" component={Document} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
