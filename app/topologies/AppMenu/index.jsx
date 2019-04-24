import PropTypes from 'prop-types';
import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

import './AppMenu.scss';

export const appMenuTopology = NS.app('topologies/menu');

class AppMenu extends Topology {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    close: PropTypes.func,
    contentClassName: PropTypes.string,
    fullScreen: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.topology = appMenuTopology;
  }

  getClassName() {
    return `AppMenu ${this.props.fullScreen ? 'AppMenu--full-screen' : 'AppMenu--floating'}`;
  }

  render() {
    if (this.state.error) {
      return this.renderError();
    }

    return (
      <OutsideClickHandler
        onOutsideClick={() => this.context.exec(NS.app('actions/menu/close'))}
      >
        {this.renderContent()}
      </OutsideClickHandler>
    );
  }
}

export default AppMenu;
