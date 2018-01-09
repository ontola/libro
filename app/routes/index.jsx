/* eslint 'react/jsx-sort-props': 'off' */
import React from 'react';
import { Route, Switch } from 'react-router';

// import CreateVoteMatch from './CreateVoteMatch';
import LinkedObject from './LinkedObject';
import DevBrowser from './DevBrowser';
import Iframe from './Iframe';
import SignIn from './SignIn';
// import { LinkVoteMatch } from './VoteMatch';

const subRoutes = [
  <Route key="1" path="/u/sign_in" component={SignIn} />,
  <Route key="2" path="/n" component={LinkedObject} />,
  <Route key="3" path="/" component={Iframe} exact />,
  <Route key="4" path="/(i|u|settings)/*" component={Iframe} />,
  <Route
    key="5"
    path="*/(new|edit|trash|delete|decision|c|settings|statistics)"
    component={Iframe}
  />,
  <Route key="6" path="*" component={LinkedObject} />
];

if (__DEVELOPMENT__) {
  subRoutes.splice(-1, 0, <Route key="7" path="/d/browser" component={DevBrowser} />);
}

export default <Switch>{subRoutes}</Switch>;
