import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Heading from '../../../components/Heading';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { tableRowTopology } from '../../../topologies/TableRow';

const MenuItemName = ({ linkedProp }) => (
  <Heading size="4" variant="semantic">
    {linkedProp.value}
  </Heading>
);

MenuItemName.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.Menu,
];

MenuItemName.property = schema.name;

MenuItemName.topology = tableRowTopology;

MenuItemName.propTypes = {
  linkedProp: linkedPropType,
};

export default register(MenuItemName);
