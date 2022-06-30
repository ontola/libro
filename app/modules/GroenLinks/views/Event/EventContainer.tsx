import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import ActionsBar from '../../../Action/topologies/ActionsBar';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';
import Card from '../../../Common/topologies/Card';
import { containerTopology } from '../../../Common/topologies/Container';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import { alertDialogTopology } from '../../../Common/topologies/Dialog';
import ontola from '../../../Core/ontology/ontola';
import teamGL from '../../ontology/teamGL';

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
