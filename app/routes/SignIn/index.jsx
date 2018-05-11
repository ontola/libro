import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Container } from '../../components';
import SignInFormContainer from '../../containers/SignInFormContainer';

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
    <SignInFormContainer redirect={redirectForLocation(location)} />
  </Container>
);

SignIn.propTypes = propTypes;

const mapStateToProps = (state, props) => ({
  form: 'signIn',
  initialValues: {
    r: props.redirect,
  },
});

export default connect(mapStateToProps)(SignIn);
