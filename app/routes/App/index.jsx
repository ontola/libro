import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { withRouter } from 'react-router';
import ScrollMemory from 'react-router-scroll-memory';
import { HotKeys } from 'react-hotkeys';

import Routes from '..';

import {
  SkipNavigation,
  Spinner,
} from '../../components';
import '../../components/shared/init.scss';
import SideBarContainer from '../../containers/SideBarContainer';
import NavbarContainer from '../../containers/NavbarContainer';
import Popup from '../../topologies/Popup/index';
import ErrorButtonWithFeedback from '../../views/Error/ErrorButtonWithFeedback';
import HoverHelper from '../DevBrowser/HoverHelper';
import { defaultKeymap, devKeymap } from '../../helpers/keyboard';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';

class App extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.retry = this.retry.bind(this);
    this.state = {
      caughtError: undefined,
    };
  }

  componentDidCatch(e, ignored) {
    handle(e);
    this.setState({ caughtError: e });
  }

  retry() {
    this.setState({
      caughtError: undefined,
    });

    return Promise.resolve();
  }

  render() {
    const {
      loading,
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
            <LinkedResourceContainer subject={NS.ontola('snackbar/manager')} />
            <LinkedResourceContainer subject={NS.ontola('dialog/manager')} />
          </SideBarContainer>
          <Popup />
        </HoverHelper>
      </HotKeys>
    );
  }
}

export default withRouter(App);
