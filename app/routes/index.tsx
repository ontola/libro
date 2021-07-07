import React from 'react';
import { Route, Switch } from 'react-router';

import LinkedObject from './LinkedObject';
import DevBrowser from './DevBrowser';
import PageBuilder from './PageBuilder';
import Sandbox from './Sandbox';

const subRoutes = [
  <Route
    component={LinkedObject}
    key="linkedResources"
    path="*"
  />,
];

if (__DEVELOPMENT__) {
  subRoutes.splice(-1, 0,
    <Route
      component={DevBrowser}
      key="devbrowser"
      path="/d/browser"
    />,
  );
  subRoutes.splice(-1, 0,
    <Route
      component={Sandbox}
      key="sandbox"
      path="/d/sandbox"
    />,
  );
  subRoutes.splice(-1, 0,
    <Route
      component={PageBuilder}
      key="builder"
      path="/d/builder"
    />,
  );
}

export default (
  <Switch>
    {subRoutes}
  </Switch>
);
