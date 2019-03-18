import { LinkedResourceContainer } from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { HotKeys } from 'react-hotkeys';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { NavBarContent, SkipNavigation } from '../../components';
import '../../components/shared/init.scss';
import NetworkStatusIndicator from '../../components/NetworkStatusIndicator';
import { getSideBarColor } from '../../state/sideBars/selectors';
import Navbar from '../../topologies/Navbar/index';
import Popup from '../../topologies/Popup/index';
import ErrorButtonWithFeedback from '../../views/Error/ErrorButtonWithFeedback';
import HoverHelper from '../DevBrowser/HoverHelper';
import { defaultKeymap, devKeymap } from '../../helpers/keyboard';
import { NS } from '../../helpers/LinkedRenderStore';
import { handle } from '../../helpers/logging';

import './index.scss';
import AppScroller from './AppScroller';
import MainContent from './MainContent';

class App extends React.PureComponent {
  static propTypes = {
    baseColor: PropTypes.string,
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
        focused
        attach={window}
        keyMap={__DEVELOPMENT__ ? devKeymap : defaultKeymap}
      >
        <style>
          {`:root { --base-color: ${this.props.baseColor} }`}
        </style>
        <HoverHelper>
          <Helmet
            defaultTitle="Argu"
            titleTemplate="%s - Argu"
          />
          <SkipNavigation />
          <div className="App__container">
            <AppScroller>
              <Navbar>
                <NavBarContent />
              </Navbar>
              <NetworkStatusIndicator />
              <MainContent />
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

function mapDataToProps(state) {
  return {
    baseColor: getSideBarColor(state),
  };
}

export default withRouter(connect(mapDataToProps)(App));
