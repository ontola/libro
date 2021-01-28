import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import teamGL from '../../../ontology/teamGL';
import CardContent from '../../../components/Card/CardContent';
import { containerTopology } from '../../../topologies/Container';
import ContentDetails from '../../../topologies/ContentDetails';
import Card from '../../../topologies/Card';

const GroupContainer = () => (
  <Card>
    <CardContent>
      <Property label={schema.name} />
      <ContentDetails>
        <Property label={teamGL.department} />
        <Property label={teamGL.volunteersCount} />
      </ContentDetails>
      <Property label={schema.text} />
    </CardContent>
  </Card>
);

GroupContainer.type = [teamGL.Group];

GroupContainer.topology = [containerTopology];

export default register(GroupContainer);
