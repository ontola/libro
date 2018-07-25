/* eslint 'react/jsx-sort-props': 'off' */
import React from 'react';
import { Route, Switch } from 'react-router';

// import CreateVoteMatch from './CreateVoteMatch';
import LinkedObject from './LinkedObject';
import DevBrowser from './DevBrowser';
import Iframe from './Iframe';
import Omniform from './OmniformRoute';
import SignIn from './SignIn';
// import { LinkVoteMatch } from './VoteMatch';

const subRoutes = [
  <Route key="signin" path="/u/sign_in" component={SignIn} />,
  <Route key="iframeRoutesTop" path="/(i|settings)/*" component={Iframe} />,
  <Route
    key="iframeRoutesNested"
    path="*/(decision|statistics)"
    component={Iframe}
  />,
  <Route key="linkedResources" path="*" component={LinkedObject} />
];

if (__DEVELOPMENT__) {
  subRoutes.splice(-1, 0, <Route key="devbrowser" path="/d/browser" component={DevBrowser} />);
  subRoutes.splice(-1, 0, <Route key="omniform" path="/d/omniform" component={Omniform} />);
}

export default <Switch>{subRoutes}</Switch>;
