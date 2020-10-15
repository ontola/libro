import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import HeaderWithMenu from '../../components/HeaderWithMenu';
import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import ContentDetails from '../../topologies/ContentDetails';

const ParticipantCardRow = () => (
  <CardContent>
    <HeaderWithMenu
      menu={<Property label={ontola.actionsMenu} />}
    >
      <Property label={schema.name} />
    </HeaderWithMenu>
    <ContentDetails>
      <Property label={teamGL.engagement} />
      <Property label={teamGL.signedUp} />
    </ContentDetails>
  </CardContent>
);

ParticipantCardRow.type = teamGL.Participant;

ParticipantCardRow.topology = cardRowTopology;

export default register(ParticipantCardRow);
