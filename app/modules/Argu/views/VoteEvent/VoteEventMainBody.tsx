import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ActionsBar from '../../../Action/topologies/ActionsBar';
import { mainBodyTopology } from '../../../Common/topologies/MainBody';
import argu from '../../lib/argu';

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
