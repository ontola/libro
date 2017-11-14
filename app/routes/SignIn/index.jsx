import PropTypes from 'prop-types';
import React from 'react';

import {
  Card,
  Container,
  Heading,
} from 'components';
import SignInFormContainer from 'containers/SignInFormContainer';

const propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      r: PropTypes.string,
    }),
  }),
};

function redirectForLocation(location) {
  const params = new URLSearchParams(location.search);
  if (params.get('r')) {
    return params.get('r');
  }
  return '';
}

const SignIn = ({ location }) => (
  <Container size="small">
    <Heading variant="column">
      Inloggen of registreren
    </Heading>
    <Card>
      <SignInFormContainer redirect={redirectForLocation(location)} />
    </Card>
  </Container>
);

SignIn.propTypes = propTypes;

export default SignIn;
