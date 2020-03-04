import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { containerTopology } from '../../topologies/Container';
import Card from '../../topologies/Card';
import HeaderWithMenu from '../../components/HeaderWithMenu';
import ActionsBar from '../../topologies/ActionsBar';
import ContentDetails from '../../topologies/ContentDetails';

const ParticipantContainer = () => (
  <Card>
    <CardContent noSpacing>
      <HeaderWithMenu
        menu={<Property label={ontola.actionsMenu} />}
      >
        <Property label={teamGL.volunteer}>
          <Property label={schema.name} />
        </Property>
      </HeaderWithMenu>
      <ContentDetails>
        <Property label={teamGL.engagement} />
      </ContentDetails>
      <Property label={teamGL.volunteer}>
        <div className="Volunteer--contact-options">
          <Property label={teamGL.telephone} />
          <Property label={teamGL.email} />
        </div>
        <Property label={schema.text} />
      </Property>
    </CardContent>
    <ActionsBar>
      <Property label={ontola.favoriteAction} />
    </ActionsBar>
  </Card>
);

ParticipantContainer.type = teamGL.Participant;

ParticipantContainer.topology = containerTopology;

export default register(ParticipantContainer);
