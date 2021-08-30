import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import { mainBodyTopology } from '../../topologies/MainBody';

const VoteEventMainBody: FC = () => (
  <div itemScope>
    <ActionsBar>
      <Property label={ontola.favoriteAction} />
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
