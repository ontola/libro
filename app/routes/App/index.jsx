import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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
import Routes from '../';

const propTypes = {
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
        {Routes}
      </div>
      {error && renderErrorMessage(error, errorMessage, reset)}
    </SideBarContainer>
  </div>
);

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default withRouter(connect(
  state => ({
    error: getErrorBool(state),
    errorMessage: getErrorMsg(state),
    loading: getLoadingBool(state),
  }),
  dispatch => ({
    reset: () => dispatch(resetErrorMessage()),
  })
)(App));
