import {
  FC,
  Property,
  register, 
} from 'link-redux';
import React from 'react';

import ActionsBar from '../../../Action/topologies/ActionsBar';
import CardContent from '../../../Common/components/Card/CardContent';
import { cardTopology } from '../../../Common/topologies/Card';
import { cardAppendixTopology } from '../../../Common/topologies/Card/CardAppendix';
import { containerTopology } from '../../../Common/topologies/Container';
import argu from '../../lib/argu';

const VoteEventContainer: FC = () => (
  <CardContent>
    <ActionsBar>
      <Property label={argu.voteOptions} />
    </ActionsBar>
    <Property
      forceRender
      label={argu.signInFlow}
    />
  </CardContent>
);

VoteEventContainer.type = [argu.VoteEvent];

VoteEventContainer.topology = [
  cardAppendixTopology,
  cardTopology,
  containerTopology,
];

export default register(VoteEventContainer);
