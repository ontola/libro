import { Literal } from '@ontologies/core';
import { FC, register } from 'link-redux';
import React from 'react';

import argu from '../../../../Argu/ontology/argu';
import RelativeDate from '../../../../Common/components/RelativeDate';
import { tableRowTopology } from '../../../../Table/topologies';
import TableCell from '../../../../Table/topologies/TableCell';
import teamGL from '../../../ontology/teamGL';

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
  teamGL.Street,
];

LastActivityAtTableRow.property = [
  argu.lastActivityAt,
  teamGL.signedUpAt,
  teamGL.lastVisitedAt,
];

LastActivityAtTableRow.topology = tableRowTopology;

export default register(LastActivityAtTableRow);
