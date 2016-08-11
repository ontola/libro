// @flow
import 'components/shared/init.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import NavbarContainer from 'containers/NavbarContainer';
import { Notification } from 'components';

const propTypes = {
  children: PropTypes.node,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

const defaultProps = {
  children: [],
};

const renderErrorMessage = (error, errorMessage) => {
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

const App = ({
  children,
  error,
  errorMessage,
}) => (
  <div>
    <NavbarContainer />
    {renderErrorMessage(error, errorMessage)}
    {children}
  </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(
  (state) => ({
    error: state.getIn(['errors', 'error']),
    errorMessage: state.getIn(['errors', 'message']),
  })
)(App);
