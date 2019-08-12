import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { CardContent } from '../../components';
import { cardRowTopology } from '../../topologies/Card/CardRow';

const ParticipantCardRow = () => (
  <CardContent>
    <Property label={[NS.schema('name'), NS.rdfs('label')]} />
  </CardContent>
);

ParticipantCardRow.type = NS.teamGL('Participant');

ParticipantCardRow.topology = cardRowTopology;

export default register(ParticipantCardRow);
