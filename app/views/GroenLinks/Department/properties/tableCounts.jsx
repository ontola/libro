import {
  labelType,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import teamGL from '../../../../ontology/teamGL';
import { tableRowTopology } from '../../../../topologies/TableRow';
import TableCell from '../../../../topologies/TableCell';

import TrendIndicator from './trendIndicator';

const TableCounts = ({
  label,
  linkedProp,
}) => (
  <TableCell elementProps={{ property: label?.value }}>
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

TableCounts.propTypes = {
  label: labelType,
  linkedProp: linkType,
};

export default register(TableCounts);
