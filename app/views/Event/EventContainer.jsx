import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import teamGL from '../../ontology/teamGL';
import { containerTopology } from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import Card from '../../topologies/Card';

const EventContainer = () => (
  <Card>
    <CardContent>
      <Property label={schema.name} />
      <ContentDetails>
        <Property label={teamGL.department} />
        <Property label={schema.startDate} />
      </ContentDetails>
      <Property label={teamGL.desiredCount} />
      <Property label={schema.text} />
    </CardContent>
  </Card>
);

EventContainer.type = teamGL.Event;

EventContainer.topology = containerTopology;

export default register(EventContainer);
