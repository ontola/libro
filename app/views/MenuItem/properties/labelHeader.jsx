import schema from '@ontologies/schema';
import { linkType, register } from 'link-redux';
import React from 'react';

import NavbarLinkLabel from '../../../components/NavbarLink/NavbarLinkLabel';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { navbarTopology } from '../../../topologies/Navbar';

const MenuItemLabelHeader = ({ linkedProp }) => (
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

MenuItemLabelHeader.mapDataToProps = {
  image: schema.image,
  name: schema.name,
};

MenuItemLabelHeader.propTypes = {
  linkedProp: linkType,
};

export default register(MenuItemLabelHeader);
