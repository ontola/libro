import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import ContentDetails from '../../topologies/ContentDetails';

const EventSection = () => (
  <CardContent>
    <Property label={schema.name} />
    <ContentDetails>
      <Property label={NS.teamGL('department')} />
      <Property label={schema.startDate} />
    </ContentDetails>
  </CardContent>
);

EventSection.type = NS.teamGL('Event');

EventSection.topology = cardRowTopology;

export default register(EventSection);
