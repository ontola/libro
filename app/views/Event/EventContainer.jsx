import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import CardContent from '../../components/Card/CardContent';
import { containerTopology } from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import Card from '../../topologies/Card';

const EventContainer = () => (
  <Card>
    <CardContent>
      <Property label={NS.schema('name')} />
      <ContentDetails>
        <Property label={NS.teamGL('department')} />
        <Property label={NS.schema('startDate')} />
      </ContentDetails>
      <Property label={NS.teamGL('desiredCount')} />
      <Property label={NS.schema('text')} />
    </CardContent>
  </Card>
);

EventContainer.type = [NS.teamGL('Event')];

EventContainer.topology = [containerTopology];

export default register(EventContainer);
