import {
  labelType,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import RelativeDate from '../../../components/RelativeDate';
import argu from '../../../ontology/argu';
import teamGL from '../../../ontology/teamGL';
import TableCell from '../../../topologies/TableCell';
import { tableRowTopology } from '../../../topologies/TableRow';

const LastActivityAtTableRow = ({ label, linkedProp }) => (
  <TableCell elementProps={{ property: label?.value }}>
    <RelativeDate date={linkedProp && new Date(linkedProp.value)} />
  </TableCell>
);

LastActivityAtTableRow.type = [
  teamGL.Department,
  teamGL.OnlineCampaigner,
  teamGL.Street,
];

LastActivityAtTableRow.property = [
  argu.lastActivityAt,
  teamGL.signedUpAt,
  teamGL.lastVisitedAt,
];

LastActivityAtTableRow.topology = tableRowTopology;

LastActivityAtTableRow.propTypes = {
  label: labelType,
  linkedProp: linkedPropType,
};

export default register(LastActivityAtTableRow);
