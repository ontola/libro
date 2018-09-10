import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ScrollMemory from 'react-router-scroll-memory';
import { HotKeys } from 'react-hotkeys';

import SideBarContainer from 'containers/SideBarContainer';
import BottomBarContainer from 'containers/BottomBarContainer';
import NavbarContainer from 'containers/NavbarContainer';
import resetErrorMessage from 'state/communication/actions';
import { getErrorBool, getErrorMsg, getLoadingBool } from 'state/communication/selectors';

import Routes from '..';

import {
  Notification,
  SkipNavigation,
  Spinner,
} from '../../components';
import '../../components/shared/init.scss';
import Popup from '../../topologies/Popup/index';
import ErrorButtonWithFeedback from '../../views/Error/ErrorButtonWithFeedback';
import HoverHelper from '../DevBrowser/HoverHelper';
import { defaultKeymap, devKeymap } from '../../helpers/keyboard';

const renderErrorMessage = (error, errorMessage, reset) => (!error ? false : (
  <Notification reset={reset} type="error">{errorMessage}</Notification>
));

class App extends React.PureComponent {
  static propTypes = {
    error: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    reset: PropTypes.func,
  };

  static defaultProps = {
    children: [],
  };

  constructor(props) {
    super(props);

    this.retry = this.retry.bind(this);
    this.state = {
      caughtError: undefined,
    };
  }

  componentDidCatch(error, ignored) {
    this.setState({ caughtError: error });
    // TODO: bugsnag
  }

  retry() {
    this.setState({
      caughtError: undefined,
    });

    return Promise.resolve();
  }

  render() {
    const {
      error,
      errorMessage,
      loading,
      reset,
    } = this.props;

    if (typeof this.state.caughtError !== 'undefined') {
      return <ErrorButtonWithFeedback reloadLinkedObject={this.retry} />;
    }

    return (
      <HotKeys
        focused
        attach={window}
        keyMap={__DEVELOPMENT__ ? devKeymap : defaultKeymap}
      >
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
          <Popup />
        </HoverHelper>
      </HotKeys>
    );
  }
}

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
