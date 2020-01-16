import { register } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { SignInFormLink } from '../../components/SignInForm';
import Button from '../../components/Button';

class AppSignInActionsBar extends React.PureComponent {
  static type = app.AppSignIn;

  static topology = actionsBarTopology;

  render() {
    return (
      <SignInFormLink Component={Button} />
    );
  }
}

export default register(AppSignInActionsBar);
