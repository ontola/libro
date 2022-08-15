import { NamedNode } from '@ontologies/core';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import { tryParseFloat } from '../../../../Common/lib/numbers';
import { tableRowTopology } from '../../../../Table/topologies';
import TableCell from '../../../../Table/topologies/TableCell';
import teamGL from '../../../ontology/teamGL';

import TrendIndicator from './trendIndicator';

interface PercentualVolunteersCountTable extends PropertyProps {
  label: NamedNode;
}

const PercentualVolunteersCountTable = ({
  label,
  linkedProp,
}: PercentualVolunteersCountTable) => (
  <TableCell>
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

export default register(PercentualVolunteersCountTable);
