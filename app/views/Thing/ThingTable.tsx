import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import TableCells from '../../components/TableCells';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';

export type ColumnType = NamedNode | NamedNode[] | Promise<any>;

interface ThingTableProps {
  columns: ColumnType[];
}

const ThingTable: FC<ThingTableProps> = ({ columns }) => (
  <TableRow>
    <TableCells columns={columns} />
  </TableRow>
);

ThingTable.type = schema.Thing;

ThingTable.topology = tableTopology;

export default register(ThingTable);