import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useFields,
} from 'link-redux';
import React from 'react';

import Link from '../../components/Link';
import ontola from '../../ontology/ontola';
import { tableCellTopology } from '../../topologies/TableCell';

import { MenuTypes } from './types';

interface PropTypes {
  name: Literal;
}

const MenuItemTableCell: FC<PropTypes> = ({
  subject,
}) => {
  const [href] = useFields(ontola.href);
  const [image] = useFields(schema.image);

  return (
    <Link to={href?.value || subject.value}>
      {image ? <Property label={schema.image} /> : <Property label={schema.name} />}
    </Link>
  );
};

MenuItemTableCell.type = MenuTypes;

MenuItemTableCell.topology = tableCellTopology;

export default register(MenuItemTableCell);
