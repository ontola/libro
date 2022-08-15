import { FC, register } from 'link-redux';
import React from 'react';

import { tableCellTopology } from '../../../Table/topologies';
import VoteData from '../../components/VoteData';
import argu from '../../ontology/argu';

const VoteEventTableCell: FC = () => (
  <VoteData />
);

VoteEventTableCell.type = argu.VoteEvent;

VoteEventTableCell.topology = tableCellTopology;

export default register(VoteEventTableCell);
