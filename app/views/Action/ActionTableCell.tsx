import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { tableCellTopology } from '../../topologies/TableCell';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

const ActionTableCell = () => {
  const [actionStatus] = useProperty(schema.actionStatus);

  if (invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  return (
    <LDLink>
      <Property label={schema.target}>
        <Property label={schema.image} />
      </Property>
    </LDLink>
  );
};

ActionTableCell.type = schema.Action;

ActionTableCell.topology = tableCellTopology;

export default register(ActionTableCell);
