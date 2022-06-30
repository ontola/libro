import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useFields,
  useStrings,
} from 'link-redux';
import React from 'react';

import Link from '../../../Common/components/Link';
import ontola from '../../../Core/ontology/ontola';
import { tableCellTopology } from '../../../Table/topologies/TableCell';
import LinkedMenuTrigger from '../../components/Menu/LinkedMenuTrigger';

import { MenuTypes } from './types';

interface PropTypes {
  name: Literal;
}

const MenuItemTableCell: FC<PropTypes> = () => {
  const [menuItems] = useFields(ontola.menuItems);
  const [href] = useFields(ontola.href);
  const [image] = useFields(schema.image);
  const [name] = useStrings(schema.name);

  if (menuItems) {
    return <LinkedMenuTrigger />;
  }

  if (!href) {
    return null;
  }

  return (
    <Link
      title={name}
      to={href.value}
    >
      {image ? <Property label={schema.image} /> : <Property label={ontola.menuItems} />}
    </Link>
  );
};

MenuItemTableCell.type = MenuTypes;

MenuItemTableCell.topology = tableCellTopology;

export default register(MenuItemTableCell);
