import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import teamGL from '../../ontology/teamGL';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import ContentDetails from '../../topologies/ContentDetails';

const EventSection = () => (
  <CardContent>
    <Property label={schema.name} />
    <ContentDetails>
      <Property label={teamGL.eventType} />
      <Property label={teamGL.department} />
      <Property label={schema.startDate} />
      <Property label={schema.location} />
    </ContentDetails>
  </CardContent>
);

EventSection.type = teamGL.Event;

EventSection.topology = cardRowTopology;

export default register(EventSection);
