/* eslint 'react/jsx-sort-props': 'off' */
import React from 'react';
import { Route, Switch } from 'react-router';

// import CreateVoteMatch from './CreateVoteMatch';
// import Forum from './Forum';
import LinkedObject from './LinkedObject';
import Iframe from './Iframe';
// import Search from './Search';
import SignIn from './SignIn';
// import { LinkVoteMatch } from './VoteMatch';

const routes = (
  <Switch>
    <Route path="/u/sign_in" component={SignIn} />
    <Route path="/n" component={LinkedObject} />
    <Route path="*" component={Iframe} />
  </Switch>
);

export default routes;
