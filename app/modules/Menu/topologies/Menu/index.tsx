import { TopologyFC, createTopologyProvider } from 'link-redux';
import React, { ReactNode } from 'react';

import DropdownMenu, { RenderProp } from '../../components/DropdownMenu/DropdownMenu';
import { Trigger } from '../../components/DropdownMenu/TriggerButton';
import { menuTopology } from '../index';

interface MenuProps {
  children: ReactNode | RenderProp,
  trigger: Trigger;
  title: string;
}

const MenuTopology = createTopologyProvider(menuTopology);

const Menu: TopologyFC<MenuProps> = ({ children, title, trigger }) => (
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

export default Menu;
