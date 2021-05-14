import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import VoteData from '../../components/VoteData';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';
import { cardTopology } from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';
import ActionsBar from '../../topologies/ActionsBar';

const VoteEventContainer: FC = () => (
  <React.Fragment key="VoteEventContainer">
    <ActionsBar>
      <Property label={ontola.favoriteAction} />
    </ActionsBar>
    <Property forceRender label={argu.signInFlow} />
    <VoteData>
      <Property label={argu.votesProCount} />
      <Property label={argu.votesNeutralCount} />
      <Property label={argu.votesConCount} />
    </VoteData>
  </React.Fragment>
);

VoteEventContainer.type = [argu.VoteEvent];

VoteEventContainer.topology = [
  cardAppendixTopology,
  cardTopology,
  containerTopology,
];

export default register(VoteEventContainer);
