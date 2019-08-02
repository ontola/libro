import { LinkedResourceContainer } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { HotKeys } from 'react-hotkeys';
import { withRouter } from 'react-router';

import { NavBarContent, SkipNavigation } from '../../components';
import '../../components/shared/init.scss';
import NetworkStatusIndicator from '../../components/NetworkStatusIndicator';
import { CONTAINER_ELEMENT } from '../../config';
import Navbar from '../../topologies/Navbar/index';
import Popup from '../../topologies/Popup/index';
import ErrorButtonWithFeedback from '../../views/Error/ErrorButtonWithFeedback';
import HoverHelper from '../DevBrowser/HoverHelper';
import { defaultKeymap, devKeymap } from '../../helpers/keyboard';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';
import Routes from '../index';

import './index.scss';
import AppScroller from './AppScroller';

class App extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
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
    if (typeof this.state.caughtError !== 'undefined') {
      return <ErrorButtonWithFeedback reloadLinkedObject={this.retry} />;
    }

    return (
      <HotKeys
        attach={__CLIENT__ ? window : {}}
        keyMap={__DEVELOPMENT__ ? devKeymap : defaultKeymap}
        tabIndex={null}
      >
        <HoverHelper>
          <Helmet
            defaultTitle={this.props.title}
            titleTemplate={this.props.title ? `%s - ${this.props.title}` : '%s'}
          />
          <SkipNavigation />
          <div className="App__container" id={CONTAINER_ELEMENT}>
            <AppScroller>
              <Navbar>
                <NavBarContent />
              </Navbar>
              <NetworkStatusIndicator />
              <div className="MainContentWrapper" id="start-of-content">
                {Routes}
              </div>
            </AppScroller>
            <LinkedResourceContainer subject={NS.ontola('snackbar/manager')} />
            <LinkedResourceContainer subject={NS.ontola('dialog/manager')} />
            <Popup />
          </div>
        </HoverHelper>
      </HotKeys>
    );
  }
}

export default withRouter(App);
