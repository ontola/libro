import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../../components/Card/CardContent';
import HeaderWithMenu from '../../../../components/HeaderWithMenu';
import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import { alertDialogTopology, containerTopology } from '../../../../topologies';
import ActionsBar from '../../../../topologies/ActionsBar';
import ContentDetails from '../../../../topologies/ContentDetails';
import Card from '../../../../topologies/Card';

const EventContainer = () => (
  <Card>
    <CardContent>
      <HeaderWithMenu
        menu={<Property label={ontola.actionsMenu} />}
      >
        <Property label={schema.name} />
      </HeaderWithMenu>
      <ContentDetails>
        <Property label={teamGL.eventType} />
        <Property label={teamGL.participantsCount} />
        <Property label={teamGL.department} />
        <Property label={schema.startDate} />
        <Property label={schema.location} />
      </ContentDetails>
      <Property label={schema.text} />
    </CardContent>
    <ActionsBar>
      <Property label={ontola.signUpAction} />
    </ActionsBar>
  </Card>
);

EventContainer.type = teamGL.Event;

EventContainer.topology = [
  alertDialogTopology,
  containerTopology,
];

export default register(EventContainer);
