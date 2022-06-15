import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import {
  cardAppendixTopology,
  cardTopology,
  containerTopology,
} from '../../../../topologies';
import ActionsBar from '../../../../topologies/ActionsBar';
import CardContent from '../../../Common/components/Card/CardContent';

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
