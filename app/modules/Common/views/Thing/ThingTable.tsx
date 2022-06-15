import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import { tableTopology } from '../../../../topologies';
import TableRow from '../../../../topologies/TableRow';
import TableCells from '../../components/TableCells';

const ThingTable: FC = () => (
  <TableRow>
    <TableCells />
  </TableRow>
);

ThingTable.type = schema.Thing;

ThingTable.topology = tableTopology;

export default register(ThingTable);
