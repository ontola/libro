import React from 'react';

import DropdownMenu from '../../components/DropdownMenu';
import argu from '../../ontology/argu';
import Topology from '../Topology';

export const menuTopology = argu.ns('topologies/menu');

interface PropTypes {
  trigger: (...args: any[]) => any;
}

class Menu extends Topology<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.topology = menuTopology;
  }

  public renderContent() {
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
