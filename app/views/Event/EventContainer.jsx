import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import ActionsBar from '../../topologies/ActionsBar';
import { containerTopology } from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import Card from '../../topologies/Card';

const EventContainer = () => (
  <Card>
    <CardContent>
      <Property label={schema.name} />
      <ContentDetails>
        <Property label={teamGL.eventType} />
        <Property label={teamGL.department} />
        <Property label={schema.startDate} />
        <Property label={schema.location} />
      </ContentDetails>
      <Property label={teamGL.desiredCount} />
      <Property label={schema.text} />
    </CardContent>
    <ActionsBar>
      <Property label={ontola.signUpAction} onLoad={() => null} />
    </ActionsBar>
  </Card>
);

EventContainer.type = teamGL.Event;

EventContainer.topology = containerTopology;

export default register(EventContainer);
