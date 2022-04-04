import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { mainBodyTopology } from '../../topologies';
import ActionsBar from '../../topologies/ActionsBar';

const VoteEventMainBody: FC = () => (
  <div itemScope>
    <ActionsBar>
      <Property label={argu.voteOptions} />
    </ActionsBar>
    <Property
      forceRender
      label={argu.signInFlow}
    />
  </div>
);

VoteEventMainBody.type = [argu.VoteEvent];

VoteEventMainBody.topology = [
  mainBodyTopology,
];

export default register(VoteEventMainBody);
