import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import teamGL from '../../ontology/teamGL';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import ContentDetails from '../../topologies/ContentDetails';

const ParticipantCardRow = () => (
  <CardContent>
    <Property label={[schema.name, rdfs.label]} />
    <ContentDetails>
      <Property label={teamGL.engagement} />
    </ContentDetails>
  </CardContent>
);

ParticipantCardRow.type = teamGL.Participant;

ParticipantCardRow.topology = cardRowTopology;

export default register(ParticipantCardRow);
