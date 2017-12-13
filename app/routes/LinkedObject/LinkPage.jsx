import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { LinkedObjectContainer, Property } from 'link-redux';
import Helmet from 'react-helmet';

import {
  Notification,
  SkipNavigation,
  Spinner,
} from 'components';
import SideBarContainer from 'containers/SideBarContainer';
import BottomBarContainer from 'containers/BottomBarContainer';
import NavbarContainer from 'containers/NavbarContainer';
import resetErrorMessage from 'state/communication/actions';
import { getErrorBool, getErrorMsg } from 'state/communication/selectors';

import '../../components/shared/init.scss';

const propTypes = {
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  reset: PropTypes.func,
};

const renderErrorMessage = (error, errorMessage, reset) => (!error ? false : (
  <Notification reset={reset} type="error">{errorMessage}</Notification>
));

const sidebar = () => (
  <LinkedObjectContainer
    object={window.location.href}
    topology="argu:page"
    onError={NavbarContainer}
    onLoad={NavbarContainer}
  >
    <Property label="schema:organization" topology="argu:sidebarBlock" />
  </LinkedObjectContainer>
);

const LinkPage = ({
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
      sidebar={sidebar()}
    >
      <BottomBarContainer />
      <div id="start-of-content">
        <LinkedObjectContainer
          object={window.location.href}
          topology="argu:page"
        />
      </div>
      {error && renderErrorMessage(error, errorMessage, reset)}
    </SideBarContainer>
  </div>
);

LinkPage.propTypes = propTypes;


export default connect(
  state => ({
    error: getErrorBool(state),
    errorMessage: getErrorMsg(state),
  }),
  dispatch => ({
    reset: () => dispatch(resetErrorMessage()),
  })
)(LinkPage);
