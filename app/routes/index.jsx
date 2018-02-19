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
    <Route path="/" component={Iframe} exact />
    <Route path="/(i|u|settings)/*" component={Iframe} />
    <Route path="*/(new|edit|trash|delete|decision|c|settings|statistics)" component={Iframe} />
    <Route path="*" component={LinkedObject} />
  </Switch>
);

export default routes;
