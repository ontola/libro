import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register, 
} from 'link-redux';
import React from 'react';

import argu from '../../../../Argu/lib/argu';
import ontola from '../../../../Core/ontology/ontola';
import NavbarLinkLabel from '../../../../NavBar/components/NavbarLink/NavbarLinkLabel';
import { navbarTopology } from '../../../../NavBar/topologies/Navbar';

const MenuItemLabelHeader: FC<PropertyProps> = ({ linkedProp }) => (
  <NavbarLinkLabel>
    {linkedProp.value}
  </NavbarLinkLabel>
);

MenuItemLabelHeader.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.Menu,
];

MenuItemLabelHeader.property = schema.name;

MenuItemLabelHeader.topology = navbarTopology;

export default register(MenuItemLabelHeader);
