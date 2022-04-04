import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import VoteData from '../../components/VoteData';
import argu from '../../ontology/argu';
import { tableCellTopology } from '../../topologies';

const VoteEventTableCell: FC = () => (
  <VoteData />
);

VoteEventTableCell.type = argu.VoteEvent;

VoteEventTableCell.topology = tableCellTopology;

export default register(VoteEventTableCell);
