/* eslint 'react/jsx-sort-props': 'off' */
import React from 'react';
import { Route, Switch } from 'react-router';

import ExternalLinkedObject from './ExternalLinkedObject';
import LinkedObject from './LinkedObject';
import DevBrowser from './DevBrowser';
import Sandbox from './Sandbox';
import RichTextEditor from './RichTextEditor';

const subRoutes = [
  <Route key="externalResources" path="/*/resource" component={ExternalLinkedObject} />,
  <Route key="linkedResources" path="*" component={LinkedObject} />,
];

if (__DEVELOPMENT__) {
  subRoutes.splice(-1, 0, <Route key="devbrowser" path="/*/d/browser" component={DevBrowser} />);
  subRoutes.splice(-1, 0, <Route key="sandbox" path="(/*)/d/sandbox" component={Sandbox} />);
  subRoutes.splice(-1, 0, <Route key="richtext" path="(/*)/d/richtext" component={RichTextEditor} />);
}

export default <Switch>{subRoutes}</Switch>;
