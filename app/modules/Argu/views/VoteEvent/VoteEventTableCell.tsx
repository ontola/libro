import { FC, register } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { tableCellTopology } from '../../../../topologies';
import VoteData from '../../components/VoteData';

const VoteEventTableCell: FC = () => (
  <VoteData />
);

VoteEventTableCell.type = argu.VoteEvent;

VoteEventTableCell.topology = tableCellTopology;

export default register(VoteEventTableCell);
