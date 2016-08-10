import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App } from '../components';

import CompareVotes from './CompareVotes';
import Document from './Document';
import Home from './Home';
import Motion from './Motion';
import Motions from './Motions';
import NotFound from './NotFound';
import Politicians from './Politicians';
import Profile from './Profile';
import Search from './Search';
import UserMotions from './UserMotions';
import UserStats from './UserStats';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="comparevotes/:userId" component={CompareVotes} />
    <Route path="motions" component={Motions} />
    <Route path="motions/:motionId" component={Motion} />
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
