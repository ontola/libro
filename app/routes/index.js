/* eslint 'react/jsx-sort-props': 'off' */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import CompareVotes from './CompareVotes';
import CreateVoteMatch from './CreateVoteMatch';
import Event from './Event';
import Forum from './Forum';
import Home from './Home';
import Info from './Info';
import InfoIndex from './InfoIndex';
import LinkedObject, { LinkedObjectByID } from './LinkedObject';
import Idea from './Idea';
import Iframe from './Iframe';
import LinkedPerson from './LinkedPerson';
import Motions from './Motions';
import Party from './Party';
import Parties from './Parties';
import Politicians from './Politicians';
import Profile from './Profile';
import Search from './Search';
import SignIn from './SignIn';
import UserMotions from './UserMotions';
import UserAbout from './UserAbout';
import UserOverview from './UserOverview';
import { LinkVoteMatch } from './VoteMatch';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="vote_matches/new" component={CreateVoteMatch} />
    <Route path="comparevotes/:userId" component={CompareVotes} />
    <Route path="vote_matches/:voteMatchId" component={LinkVoteMatch} />
    <Route path="motions" component={Motions} />
    <Route path="events/:eventId" component={Event} />
    <Route path="motions/:motionId" component={LinkedObject} />
    <Route path="parties" component={Parties} />
    <Route path="parties/:partyId" component={Party} />
    <Route path="politicians" component={Politicians} />
    <Route path="profile/:userId" component={Profile}>
      <IndexRoute component={UserOverview} />
      <Route path="motions" component={UserMotions} />
      <Route path="about" component={UserAbout} />
    </Route>
    <Route path="search" component={Search} />
    <Route path="info" component={InfoIndex} />
    <Route path="info/:infoId" component={Info} />
    <Route path="u/sign_in" component={SignIn} />
    <Route path="u/:id" component={LinkedPerson} />
    <Route path="m/:id" component={Idea} />
    <Route path="q/:id" component={LinkedObject} />
    <Route path="a/:id" component={LinkedObject} />
    <Route path="f/:id" component={Forum} />
    <Route path="od" component={LinkedObjectByID} />
    <Route path="*" component={Iframe} />
  </Route>
);

export default routes;
