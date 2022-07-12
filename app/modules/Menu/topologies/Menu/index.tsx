import { useTopologyProvider } from 'link-redux';
import React, { ReactNode } from 'react';

import libro from '../../../Kernel/ontology/libro';
import DropdownMenu, { RenderProp } from '../../components/DropdownMenu/DropdownMenu';
import { Trigger } from '../../components/DropdownMenu/TriggerButton';

export const menuTopology = libro.topologies.menu;

interface MenuProps {
  children: ReactNode | RenderProp,
  trigger: Trigger;
  title: string;
}

const Menu: React.FC<MenuProps> = ({ children, title, trigger }) => {
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
