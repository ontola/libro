// @flow
import './app.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import NavbarContainer from '../../containers/NavbarContainer';
import { Notification } from '../';

const propTypes = {
  children: PropTypes.node,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const defaultProps = {
  children: [],
};

const App = ({ children, error, errorMessage }) => {
  const renderErrorMessage = () => {
    if (error) {
      return (
        <Notification
          type="error"
          children={errorMessage}
        />
      );
    }
    return false;
  };

  return (
    <div>
      <NavbarContainer />
      {renderErrorMessage()}
      {children}
    </div>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(
  (state) => ({
    error: state.getIn(['errors', 'error']),
    errorMessage: state.getIn(['errors', 'message']),
  })
)(App);
