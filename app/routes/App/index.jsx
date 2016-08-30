
import '../../components/shared/init.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import NavbarContainer from 'containers/NavbarContainer';
import { Notification, Spinner } from 'components';

import { resetErrorMessage } from 'state/communication/actions';
import { getErrorBool, getErrorMsg, getLoadingBool } from 'state/communication/selectors';

const propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
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
  loading,
  reset,
}) => (
  <div>
    <Spinner loading={loading} />
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
    loading: getLoadingBool(state),
  }),
  (dispatch) => ({
    reset: () => dispatch(resetErrorMessage()),
  })
)(App);
