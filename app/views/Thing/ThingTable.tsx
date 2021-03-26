import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import TableCells from '../../components/TableCells';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';

const ThingTable: FC = () => (
  <TableRow>
    <TableCells />
  </TableRow>
);

ThingTable.type = schema.Thing;

ThingTable.topology = tableTopology;

export default register(ThingTable);
