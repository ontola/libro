import React from 'react';

import DropdownMenu  from '../../components/DropdownMenu/DropdownMenu';
import { Trigger } from '../../components/DropdownMenu/TriggerButton';
import argu from '../../ontology/argu';
import Topology, { TopologyContent } from '../Topology';

export const menuTopology = argu.ns('topologies/menu');

interface PropTypes {
  trigger: Trigger;
  title: string;
}

class Menu extends Topology<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.topology = menuTopology;
  }

  public renderContent(): TopologyContent {
    const {
      children,
      title,
      trigger,
    } = this.props;

    return this.wrap((
      <DropdownMenu
        className="Menu"
        title={title}
        trigger={trigger}
      >
        {children}
      </DropdownMenu>
    ));
  }
}

export default Menu;
