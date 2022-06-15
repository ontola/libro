import { Literal } from '@ontologies/core';
import { FC, register } from 'link-redux';
import React from 'react';

import argu from '../../../../Argu/ontology/argu';
import teamGL from '../../../ontology/teamGL';
import { tableRowTopology } from '../../../../../topologies';
import TableCell from '../../../../../topologies/TableCell';
import RelativeDate from '../../../../Common/components/RelativeDate';

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
