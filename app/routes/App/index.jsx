import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ScrollMemory from 'react-router-scroll-memory';

import SideBarContainer from 'containers/SideBarContainer';
import BottomBarContainer from 'containers/BottomBarContainer';
import NavbarContainer from 'containers/NavbarContainer';
import resetErrorMessage from 'state/communication/actions';
import { getErrorBool, getErrorMsg, getLoadingBool } from 'state/communication/selectors';

import Routes from '..';

import {
  LinkedPopup,
  Notification,
  SkipNavigation,
  Spinner,
} from '../../components';
import '../../components/shared/init.scss';
import HoverHelper from '../DevBrowser/HoverHelper';

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
  <HoverHelper>
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
      sidebar={<NavbarContainer />}
    >
      <div className="MainContentWrapper" id="start-of-content">
        <ScrollMemory elementId="start-of-content" />
        {Routes}
      </div>
      <BottomBarContainer />
      {error && renderErrorMessage(error, errorMessage, reset)}
    </SideBarContainer>
    <LinkedPopup />
  </HoverHelper>
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
