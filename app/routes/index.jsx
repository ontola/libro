/* eslint 'react/jsx-sort-props': 'off' */
import React from 'react';
import { Route, Switch } from 'react-router';

import { PDF } from '../components';

import LinkedObject from './LinkedObject';
import DevBrowser from './DevBrowser';
import SignIn from './SignIn';
// import { LinkVoteMatch } from './VoteMatch';

const subRoutes = [
  <Route key="signin" path="/u/sign_in" component={SignIn} />,
  <Route key="linkedResources" path="*" component={LinkedObject} />,
];

if (__DEVELOPMENT__) {
  const PDFDebugger = () => (
    <PDF file="https://media.readthedocs.org/pdf/pymisp/master/pymisp.pdf" />
  );

  subRoutes.splice(-1, 0, <Route key="devbrowser" path="/d/browser" component={DevBrowser} />);
  subRoutes.splice(-1, 0, <Route key="pdf" path="/d/pdf" component={PDFDebugger} />);
}

export default <Switch>{subRoutes}</Switch>;
