import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import CompareVotes from './CompareVotes';
import Event from './Event';
import Home from './Home';
import Motion from './Motion';
import Motions from './Motions';
import NotFound from './NotFound';
import Party from './Party';
import Parties from './Parties';
import Politicians from './Politicians';
import Profile from './Profile';
import Search from './Search';
import UserMotions from './UserMotions';
import UserAbout from './UserAbout';
import UserOverview from './UserOverview';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="comparevotes/:userId" component={CompareVotes} />
    <Route path="motions" component={Motions} />
    <Route path="events/:eventId" component={Event} />
    <Route path="motions/:motionId" component={Motion} />
    <Route path="parties" component={Parties} />
    <Route path="parties/:partyId" component={Party} />
    <Route path="politicians" component={Politicians} />
    <Route path="profile/:userId" component={Profile}>
      <IndexRoute component={UserOverview} />
      <Route path="motions" component={UserMotions} />
      <Route path="about" component={UserAbout} />
    </Route>
    <Route path="search" component={Search} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
