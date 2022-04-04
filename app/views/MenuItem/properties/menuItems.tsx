import { NamedNode } from '@ontologies/core';
import {
  FC,
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { menuTopology, navbarTopology } from '../../../topologies';

interface MenuItemsProps {
  childProps: any;
  linkedProp: NamedNode;
}

const MenuItems: FC<MenuItemsProps> = ({ childProps }) => {
  const menuItems = useProperty(ontola.menuItems);

  if (menuItems.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      {menuItems.map((item) => (
        <Resource
          childProps={childProps}
          key={`menu-${item}`}
          subject={item}
        />
      ))}
    </React.Fragment>
  );
};

MenuItems.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.MenuSection,
];

MenuItems.property = ontola.menuItems;

MenuItems.topology = [
  navbarTopology,
  menuTopology,
];

export default register(MenuItems);
