import { NamedNode } from '@ontologies/core';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import TableCell from '../../../../Table/topologies/TableCell';
import { tableRowTopology } from '../../../../Table/topologies/TableRow';
import teamGL from '../../../ontology/teamGL';

import TrendIndicator from './trendIndicator';

interface TableCounts extends PropertyProps {
  label: NamedNode;
}

const TableCounts = ({
  label,
  linkedProp,
}: TableCounts) => (
  <TableCell>
    <div style={{ whiteSpace: 'nowrap' }}>
      {linkedProp.value}
      <TrendIndicator property={label} />
    </div>
  </TableCell>
);

TableCounts.type = teamGL.Department;

TableCounts.property = [
  teamGL.totalFutureEventsCount,
  teamGL.totalGroupsCount,
  teamGL.totalNewVolunteersCount,
  teamGL.totalVolunteersCount,
];

TableCounts.topology = tableRowTopology;

export default register(TableCounts);
