/* eslint 'react/jsx-sort-props': 'off' */
import React from 'react';
import { Route, Switch } from 'react-router';

// import CompareVotes from './CompareVotes';
// import CreateVoteMatch from './CreateVoteMatch';
// import Event from './Event';
// import Forum from './Forum';
// import Home from './Home';
// import Info from './Info';
// import InfoIndex from './InfoIndex';
// import LinkedObject, { LinkedObjectByID } from './LinkedObject';
// import Idea from './Idea';
import Iframe from './Iframe';
// import LinkedPerson from './LinkedPerson';
// import Motions from './Motions';
// import Party from './Party';
// import Parties from './Parties';
// import Politicians from './Politicians';
// import Profile from './Profile';
// import Search from './Search';
import SignIn from './SignIn';
// import UserMotions from './UserMotions';
// import UserAbout from './UserAbout';
// import UserOverview from './UserOverview';
// import { LinkVoteMatch } from './VoteMatch';

const routes = (
  <Switch>
    <Route path="/u/sign_in" component={SignIn} />
    <Route path="*" component={Iframe} />
  </Switch>
);

export default routes;
