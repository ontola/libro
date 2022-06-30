import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import { cardRowTopology } from '../../../Common/topologies/Card/CardRow';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import teamGL from '../../ontology/teamGL';

const EventCardRow = () => (
  <CardContent>
    <Property label={schema.name} />
    <ContentDetails>
      <Property label={teamGL.eventType} />
      <Property label={teamGL.participantsCount} />
      <Property label={teamGL.department} />
      <Property label={schema.startDate} />
      <Property label={schema.location} />
    </ContentDetails>
  </CardContent>
);

EventCardRow.type = teamGL.Event;

EventCardRow.topology = cardRowTopology;

export default register(EventCardRow);
