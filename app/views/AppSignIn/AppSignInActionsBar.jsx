import { register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { actionsBarTopology } from '../../topologies/ActionsBar';
import { SignInFormLink } from '../../components/SignInForm';
import Button from '../../components/Button';

class AppSignInActionsBar extends React.PureComponent {
  static type = NS.app('AppSignIn');

  static topology = actionsBarTopology;

  render() {
    return (
      <SignInFormLink Component={Button} />
    );
  }
}

export default register(AppSignInActionsBar);
