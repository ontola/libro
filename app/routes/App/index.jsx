import '../../components/shared/init.scss';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  // BottomBar,
  NavBarContent,
  Notification,
  Spinner,
} from 'components';

import SideBarContainer from 'containers/SideBarContainer';
import BottomBarContainer from 'containers/BottomBarContainer';

import resetErrorMessage from 'state/communication/actions';
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

const renderErrorMessage = (error, errorMessage, reset) => (!error ? false : (
  <Notification type="error" reset={reset}>{errorMessage}</Notification>
));

const App = ({
  children,
  error,
  errorMessage,
  loading,
  reset,
}) => (
  <div>
    <Helmet
      htmlAttributes={{ lang: 'nl' }}
      titleTemplate="%s - Argu"
      defaultTitle="Argu"
    />
    <Spinner loading={loading} />
    <SideBarContainer
      id="Navbar"
      sidebar={<NavBarContent />}
      slim
    >
      <BottomBarContainer />
      {children}
      {renderErrorMessage(error, errorMessage, reset)}
    </SideBarContainer>
  </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(
  state => ({
    error: getErrorBool(state),
    errorMessage: getErrorMsg(state),
    loading: getLoadingBool(state),
  }),
  dispatch => ({
    reset: () => dispatch(resetErrorMessage()),
  })
)(App);
