import {
  labelType,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { calcPercentage, tryParseInt } from '../../../helpers/numbers';
import teamGL from '../../../ontology/teamGL';
import { tableRowTopology } from '../../../topologies/TableRow';
import TableCell from '../../../topologies/TableCell';

const PercentualVolunteersCountTable = ({
  label,
  linkedProp,
  volunteersCount,
}) => (
  <TableCell elementProps={{ property: label?.value }}>
    {`${calcPercentage(tryParseInt(linkedProp), tryParseInt(volunteersCount)) || 0}%`}
  </TableCell>
);

PercentualVolunteersCountTable.type = teamGL.Department;

PercentualVolunteersCountTable.property = [
  teamGL.inactiveVolunteersCount,
  teamGL.activeVolunteersCount,
  teamGL.veryActiveVolunteersCount,
];

PercentualVolunteersCountTable.topology = tableRowTopology;

PercentualVolunteersCountTable.mapDataToProps = {
  volunteersCount: teamGL.volunteersCount,
};

PercentualVolunteersCountTable.propTypes = {
  label: labelType,
  linkedProp: linkType,
  volunteersCount: linkType,
};

export default register(PercentualVolunteersCountTable);
