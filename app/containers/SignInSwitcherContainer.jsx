import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { currentURL } from '../helpers/iris';
import { signInSubject } from '../state/form/selectors';

import { SignInFormContainerCardRow } from './SignInFormContainer';

const propTypes = {
  children: PropTypes.node,
  showSignIn: PropTypes.bool,
};

class SignInSwitcherContainer extends React.PureComponent {
  render() {
    if (this.props.showSignIn === true) {
      return (
        <SignInFormContainerCardRow
          r={currentURL()}
          reason="Registreer of log in met jouw email adres:"
        />
      );
    }
    return this.props.children;
  }
}

SignInSwitcherContainer.propTypes = propTypes;

const mapStateToProps = (state, { subject }) => ({
  showSignIn: signInSubject(state) === subject.toString(),
});


export default connect(mapStateToProps)(SignInSwitcherContainer);
