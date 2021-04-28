import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { tableRowTopology } from '../../topologies/TableRow';

const ActionTableRow = () => (
  <LDLink>
    <Property label={schema.target}>
      <Property label={schema.image} />
    </Property>
  </LDLink>
);

ActionTableRow.type = schema.Action;

ActionTableRow.topology = tableRowTopology;

export default register(ActionTableRow);
