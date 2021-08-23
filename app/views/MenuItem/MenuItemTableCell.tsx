import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Link from '../../components/Link';
import ontola from '../../ontology/ontola';
import { tableCellTopology } from '../../topologies/TableCell';

import { MenuTypes } from './types';

interface PropTypes {
  name: Literal;
}

const MenuItemTableCell: FC<PropTypes> = () => {
  const [href] = useProperty(ontola.href);

  return (
    <Link to={href?.value}>
      <Property label={schema.image} />
    </Link>
  );
};

MenuItemTableCell.type = MenuTypes;

MenuItemTableCell.topology = tableCellTopology;

export default register(MenuItemTableCell);
