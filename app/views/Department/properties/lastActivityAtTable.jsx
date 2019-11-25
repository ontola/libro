import { labelType, register } from 'link-redux';
import React from 'react';

import { LinkedDetailDate } from '../../../components';
import argu from '../../../ontology/argu';
import teamGL from '../../../ontology/teamGL';
import TableCell from '../../../topologies/TableCell';
import { tableRowTopology } from '../../../topologies/TableRow';

const LastActivityAtTableRow = ({ label }) => (
  <TableCell elementProps={{ property: label?.value }}>
    <LinkedDetailDate />
  </TableCell>
);

LastActivityAtTableRow.type = teamGL.Department;

LastActivityAtTableRow.property = argu.lastActivityAt;

LastActivityAtTableRow.topology = tableRowTopology;

LastActivityAtTableRow.propTypes = {
  label: labelType,
};

export default register(LastActivityAtTableRow);
