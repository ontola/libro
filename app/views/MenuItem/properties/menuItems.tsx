import { NamedNode } from '@ontologies/core';
import {
  FC,
  Resource,
  ReturnType,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { menuTopology } from '../../../topologies/Menu';
import { navbarTopology } from '../../../topologies/Navbar';

interface MenuItemsProps {
  childProps: any;
  linkedProp: NamedNode;
  menuItems: NamedNode[];
}

const MenuItems: FC<MenuItemsProps> = ({
  childProps,
  menuItems,
}) => {
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

MenuItems.mapDataToProps = {
  menuItems: {
    label: ontola.menuItems,
    returnType: ReturnType.AllTerms,
  },
};

export default register(MenuItems);
