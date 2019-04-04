import { register } from 'link-redux';
import React from 'react';

import SignInFormContainer from '../../containers/SignInFormContainer';
import { NS } from '../../helpers/LinkedRenderStore';
import { alertDialogTopology } from '../../topologies/Dialog';

class AppSignIn extends React.PureComponent {
  static type = NS.app('AppSignIn');

  static topology = alertDialogTopology;

  render() {
    return (
      <SignInFormContainer />
    );
  }
}

export default [
  register(AppSignIn),
];
