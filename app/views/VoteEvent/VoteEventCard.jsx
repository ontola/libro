import { Property, register } from 'link-redux';
import React from 'react';

import VoteData from '../../components/VoteData';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import ActionsBar from '../../topologies/ActionsBar';
import { cardMainTopology } from '../../topologies/Card/CardMain';

const VoteEventCard = () => (
  <div itemScope>
    <ActionsBar>
      <Property label={ontola.favoriteAction} />
    </ActionsBar>
    <Property forceRender label={argu.signInFlow} />
    <VoteData>
      <Property label={argu.votesProCount} />
      <Property label={argu.votesNeutralCount} />
      <Property label={argu.votesConCount} />
    </VoteData>
  </div>
);

VoteEventCard.type = [argu.VoteEvent];

VoteEventCard.topology = [
  cardMainTopology,
];

export default register(VoteEventCard);
