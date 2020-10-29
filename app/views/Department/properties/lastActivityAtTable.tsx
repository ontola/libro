import { Literal } from '@ontologies/core';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import RelativeDate from '../../../components/RelativeDate';
import argu from '../../../ontology/argu';
import teamGL from '../../../ontology/teamGL';
import TableCell from '../../../topologies/TableCell';
import { tableRowTopology } from '../../../topologies/TableRow';

interface LastActivityAtTableRowProps {
  linkedProp: Literal;
}

const LastActivityAtTableRow: FC<LastActivityAtTableRowProps> = ({
  linkedProp,
}) => (
  <TableCell>
    <RelativeDate date={linkedProp} />
  </TableCell>
);

LastActivityAtTableRow.type = [
  teamGL.Department,
  teamGL.OnlineCampaigner,
];

LastActivityAtTableRow.property = [
  argu.lastActivityAt,
  teamGL.signedUpAt,
];

LastActivityAtTableRow.topology = tableRowTopology;

export default register(LastActivityAtTableRow);
