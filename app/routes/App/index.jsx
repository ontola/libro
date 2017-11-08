import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
  Notification,
  SkipNavigation,
  Spinner,
} from 'components';
import SideBarContainer from 'containers/SideBarContainer';
import BottomBarContainer from 'containers/BottomBarContainer';
import NewNavbarContainer from 'containers/NewNavbarContainer';
import resetErrorMessage from 'state/communication/actions';
import { getErrorBool, getErrorMsg, getLoadingBool } from 'state/communication/selectors';

import '../../components/shared/init.scss';

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
  <Notification reset={reset} type="error">{errorMessage}</Notification>
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
      defaultTitle="Argu"
      htmlAttributes={{ lang: 'nl' }}
      titleTemplate="%s - Argu"
    />
    <Spinner loading={loading} />
    <SkipNavigation />
    <SideBarContainer
      slim
      id="Navbar"
      sidebar={<NewNavbarContainer />}
    >
      <BottomBarContainer />
      <div id="start-of-content">
        {children}
      </div>
      {error && renderErrorMessage(error, errorMessage, reset)}
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
