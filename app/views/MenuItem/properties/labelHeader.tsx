import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import NavbarLinkLabel from '../../../components/NavbarLink/NavbarLinkLabel';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { navbarTopology } from '../../../topologies';

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
