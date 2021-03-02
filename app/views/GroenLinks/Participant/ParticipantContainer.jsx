import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import ontola from '../../../ontology/ontola';
import teamGL from '../../../ontology/teamGL';
import { containerTopology } from '../../../topologies/Container';
import Card from '../../../topologies/Card';
import HeaderWithMenu from '../../../components/HeaderWithMenu';
import ActionsBar from '../../../topologies/ActionsBar';
import ContentDetails from '../../../topologies/ContentDetails';

const ParticipantContainer = () => (
  <Card>
    <CardContent noSpacing>
      <HeaderWithMenu
        menu={<Property label={ontola.actionsMenu} />}
      >
        <Property label={[schema.name, rdfs.label]} />
      </HeaderWithMenu>
      <ContentDetails>
        <Property label={teamGL.engagement} />
        <Property label={teamGL.signedUp} />
      </ContentDetails>
      <div className="Volunteer--contact-options">
        <Property label={teamGL.telephone} />
        <Property label={schema.email} />
      </div>
      <Property label={schema.text} />
    </CardContent>
    <ActionsBar>
      <Property label={ontola.favoriteAction} />
    </ActionsBar>
  </Card>
);

ParticipantContainer.type = teamGL.Participant;

ParticipantContainer.topology = containerTopology;

export default register(ParticipantContainer);
