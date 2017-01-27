import React, { PropTypes } from 'react';

import {
  Card,
  Container,
  Heading,
} from 'components';

import SignInFormContainer from 'containers/SignInFormContainer';

const propTypes = {
  location: PropTypes.object,
};

const SignIn = ({ location }) => (
  <Container size="small">
    <Heading variant="column">
      Inloggen of registreren
    </Heading>
    <Card>
      <SignInFormContainer redirect={location.query.r} />
    </Card>
  </Container>
);

SignIn.propTypes = propTypes;

export default SignIn;
