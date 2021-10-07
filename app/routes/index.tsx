import React from 'react';
import { Route, Switch } from 'react-router';

import PopoutViewer from '../containers/PopoutViewer';
import RDFStudio from '../containers/Studio';

import LinkedObject from './LinkedObject';
import DevBrowser from './DevBrowser';
import Sandbox from './Sandbox';

const subRoutes = [
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
      component={RDFStudio}
      key="studio"
      path="/d/studio"
    />
  ));

  if (__CLIENT__ && window.location.pathname.startsWith('/d/studio/viewer')) {
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

export default (
  <Switch>
    {subRoutes}
  </Switch>
);
