import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../../Argu/ontology/argu';
import Heading, { HeadingSize, HeadingVariant } from '../../../../Common/components/Heading';
import ontola from '../../../../Kernel/ontology/ontola';
import { tableRowTopology } from '../../../../Table/topologies';

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
