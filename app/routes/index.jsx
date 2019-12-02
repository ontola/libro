/* eslint 'react/jsx-sort-props': 'off' */
import React from 'react';
import { Route, Switch } from 'react-router';

import LinkedObject from './LinkedObject';
import DevBrowser from './DevBrowser';
import SignIn from './SignIn';
import Sandbox from './Sandbox';

const subRoutes = [
  <Route key="signin" path={['/u/sign_in', '/*/u/sign_in']} component={SignIn} />,
  <Route key="linkedResources" path="*" component={LinkedObject} />,
];

if (__DEVELOPMENT__) {
  subRoutes.splice(-1, 0, <Route key="devbrowser" path="/d/browser" component={DevBrowser} />);
  subRoutes.splice(-1, 0, <Route key="sandbox" path="/d/sandbox" component={Sandbox} />);
}

export default <Switch>{subRoutes}</Switch>;
