import PropTypes from 'prop-types';
import React from 'react';

import DropdownMenu from '../../components/DropdownMenu';
import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

export const menuTopology = NS.argu('topologies/menu');

class Menu extends Topology {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    trigger: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.topology = menuTopology;
  }

  renderContent() {
    const {
      children,
      trigger,
    } = this.props;

    return this.wrap((
      <DropdownMenu
        className="Menu"
        trigger={trigger}
      >
        {children}
      </DropdownMenu>
    ));
  }
}

export default Menu;
