import { register } from 'link-redux';
import React from 'react';

import SignInFormContainer from '../../containers/SignInFormContainer';
import app from '../../ontology/app';
import Container from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';

class AppSignInAlert extends React.PureComponent {
  static type = app.AppSignIn;

  static topology = alertDialogTopology;

  render() {
    return (
      <Container>
        <SignInFormContainer />
      </Container>
    );
  }
}

export default register(AppSignInAlert);
