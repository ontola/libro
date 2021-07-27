import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import VoteData from '../../components/VoteData';
import argu from '../../ontology/argu';
import { tableCellTopology } from '../../topologies/TableCell';

const VoteEventTableCell: FC = () => (
  <VoteData hover={false}>
    <Property label={argu.votesProCount} />
    <Property label={argu.votesNeutralCount} />
    <Property label={argu.votesConCount} />
  </VoteData>
);

VoteEventTableCell.type = argu.VoteEvent;

VoteEventTableCell.topology = tableCellTopology;

export default register(VoteEventTableCell);
