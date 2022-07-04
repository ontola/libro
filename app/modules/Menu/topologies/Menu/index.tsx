import { useTopologyProvider } from 'link-redux';
import React, { ReactNode } from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import libro from '../../../Kernel/ontology/libro';
import DropdownMenu, { RenderProp } from '../../components/DropdownMenu/DropdownMenu';
import { Trigger } from '../../components/DropdownMenu/TriggerButton';

export const menuTopology = libro.topologies.menu;

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
