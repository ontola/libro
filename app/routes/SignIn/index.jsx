import React from 'react';

import {
  Card,
  Container,
  Heading,
} from 'components';

import SignInFormContainer from 'containers/SignInFormContainer';

const SignIn = () => (
  <Container size="small">
    <Heading variant="column">
      Inloggen of registreren
    </Heading>
    <Card>
      <SignInFormContainer />
    </Card>
  </Container>
);

export default SignIn;
