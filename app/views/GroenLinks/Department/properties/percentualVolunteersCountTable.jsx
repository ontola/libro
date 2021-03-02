import {
  labelType,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { tryParseFloat } from '../../../../helpers/numbers';
import teamGL from '../../../../ontology/teamGL';
import { tableRowTopology } from '../../../../topologies/TableRow';
import TableCell from '../../../../topologies/TableCell';

import TrendIndicator from './trendIndicator';

const PercentualVolunteersCountTable = ({
  label,
  linkedProp,
}) => (
  <TableCell elementProps={{ property: label?.value }}>
    <div style={{ whiteSpace: 'nowrap' }}>
      {`${Math.round((tryParseFloat(linkedProp) || 0) * 100)}%`}
      <TrendIndicator property={label} />
    </div>
  </TableCell>
);

PercentualVolunteersCountTable.type = teamGL.Department;

PercentualVolunteersCountTable.property = [
  teamGL.inactiveVolunteersRatio,
  teamGL.activeVolunteersRatio,
  teamGL.veryActiveVolunteersRatio,
];

PercentualVolunteersCountTable.topology = tableRowTopology;

PercentualVolunteersCountTable.propTypes = {
  label: labelType,
  linkedProp: linkType,
};

export default register(PercentualVolunteersCountTable);
