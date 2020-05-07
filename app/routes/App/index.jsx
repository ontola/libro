import rdf from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { HotKeys } from 'react-hotkeys';
import { withRouter } from 'react-router';
import ScrollMemory from 'react-router-scroll-memory';

import DutchGovernmentHeader from '../../components/Headers/DutchGovernmentHeader';
import '../../components/shared/init.scss';
import NavBarContent from '../../components/NavBarContent';
import NetworkStatusIndicator from '../../components/NetworkStatusIndicator';
import SkipNavigation from '../../components/SkipNavigation';
import { CONTAINER_ELEMENT } from '../../config';
import { getMetaContent } from '../../helpers/arguHelpers';
import { defaultKeymap, devKeymap } from '../../helpers/keyboard';
import { handle } from '../../helpers/logging';
import app from '../../ontology/app';
import ontola from '../../ontology/ontola';
import Footer from '../../topologies/Footer';
import Navbar from '../../topologies/Navbar/index';
import Popup from '../../topologies/Popup/index';
import ErrorButtonWithFeedback from '../../views/Error/ErrorButtonWithFeedback';
import HoverHelper from '../DevBrowser/HoverHelper';
import Routes from '../index';

import './index.scss';

const headers = {
  dutchGovernment: DutchGovernmentHeader,
};

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

  componentDidMount() {
    if (__CLIENT__) {
      window.scrollTo(0, 0);
    }
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

    const template = getMetaContent('template');
    const templateOptions = new URLSearchParams(getMetaContent('templateOpts'));
    const footerResources = templateOptions.get('footerResources')?.split(',') || [];
    const Header = headers[template];

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
          <div className={CONTAINER_ELEMENT} id={CONTAINER_ELEMENT}>
            {Header && <Header templateOptions={templateOptions} />}
            <Navbar>
              <NavBarContent />
            </Navbar>
            <div className="Banners">
              <Resource subject={app.bannerMembers} />
            </div>
            <NetworkStatusIndicator />
            <div id="start-of-content">
              <ScrollMemory />
              {Routes}
            </div>
            <Footer resources={footerResources.map((iri) => rdf.namedNode(iri))} />
            <Resource subject={ontola.ns('snackbar/manager')} />
            <Resource subject={ontola.ns('dialog/manager')} />
            <Popup />
          </div>
        </HoverHelper>
      </HotKeys>
    );
  }
}

export default withRouter(App);
