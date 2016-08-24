
import '../../components/shared/init.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import NavbarContainer from 'containers/NavbarContainer';
import { Notification } from 'components';

import { resetErrorMessage } from 'state/errors/actions';
import { getErrorBool, getErrorMsg } from 'state/errors/selectors';

const propTypes = {
  children: PropTypes.node,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  reset: PropTypes.func,
};

const defaultProps = {
  children: [],
};

const renderErrorMessage = (error, errorMessage, reset) => {
  if (!error) {
    return false;
  }

  return (
    <Notification
      type="error"
      children={errorMessage}
      reset={reset}
    />
  );
};

const App = ({
  children,
  error,
  errorMessage,
  reset,
}) => (
  <div>
    <NavbarContainer />
    {renderErrorMessage(error, errorMessage, reset)}
    {children}
  </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(
  (state) => ({
    error: getErrorBool(state),
    errorMessage: getErrorMsg(state),
  }),
  (dispatch) => ({
    reset: () => dispatch(resetErrorMessage()),
  })
)(App);
