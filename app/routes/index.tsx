import React from 'react';
import { Route, Switch } from 'react-router';

import ExternalLinkedObject from './ExternalLinkedObject';
import LinkedObject from './LinkedObject';
import DevBrowser from './DevBrowser';
import PageBuilder from './PageBuilder';
import { PopoutViewer } from './PageBuilder/PopoutViewer';
import Sandbox from './Sandbox';

const subRoutes = [
  <Route
    component={ExternalLinkedObject}
    key="externalResources"
    path="(/\w*)?/resource\?"
  />,
  <Route
    component={LinkedObject}
    key="linkedResources"
    path="*"
  />,
];

if (__DEVELOPMENT__) {
  subRoutes.splice(-1, 0, (
    <Route
      component={DevBrowser}
      key="devbrowser"
      path="/d/browser"
    />
  ));
  subRoutes.splice(-1, 0, (
    <Route
      component={Sandbox}
      key="sandbox"
      path="/d/sandbox"
    />
  ));
  subRoutes.splice(-1, 0, (
    <Route
      exact
      component={PageBuilder}
      key="builder"
      path="/d/builder"
    />
  ));


  if (__CLIENT__ && window.location.pathname.startsWith('/d/builder/viewer')) {
    subRoutes.shift();
    subRoutes.unshift((
      <Route
        component={PopoutViewer}
        key="popout-viewer"
        path="*"
      />
    ));
  }
}

export default <Switch>{subRoutes}</Switch>;
