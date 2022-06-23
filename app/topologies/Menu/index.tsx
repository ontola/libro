import React, { ReactNode } from 'react';
import { useTopologyProvider } from 'link-redux';

import DropdownMenu, { RenderProp } from '../../modules/Menu/components/DropdownMenu/DropdownMenu';
import { Trigger } from '../../modules/Menu/components/DropdownMenu/TriggerButton';
import { menuTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

interface MenuProps {
  children: ReactNode | RenderProp,
  trigger: Trigger;
  title: string;
}

const Menu: TopologyFC<MenuProps> = ({ children, title, trigger }) => {
  const [MenuTopology] = useTopologyProvider(menuTopology);

  return (
    <MenuTopology>
      <DropdownMenu
        className="Menu"
        title={title}
        trigger={trigger}
      >
        {children}
      </DropdownMenu>
    </MenuTopology>
  );
};

export default Menu;
