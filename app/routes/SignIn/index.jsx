import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import SignInFormContainer from '../../containers/SignInFormContainer';
import Container from '../../topologies/Container';

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
    <SignInFormContainer fullPage r={redirectForLocation(location)} />
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
