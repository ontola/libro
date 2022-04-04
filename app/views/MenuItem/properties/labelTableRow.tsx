import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import Heading, { HeadingSize, HeadingVariant } from '../../../components/Heading';
import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { tableRowTopology } from '../../../topologies';

const MenuItemLabelTableRow: FC<PropertyProps> = ({ linkedProp }) => (
  <Heading
    size={HeadingSize.SM}
    variant={HeadingVariant.Semantic}
  >
    {linkedProp.value}
  </Heading>
);

MenuItemLabelTableRow.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.Menu,
];

MenuItemLabelTableRow.property = schema.name;

MenuItemLabelTableRow.topology = tableRowTopology;

export default register(MenuItemLabelTableRow);
