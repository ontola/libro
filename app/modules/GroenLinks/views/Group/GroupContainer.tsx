import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import Card from '../../../Common/topologies/Card';
import { containerTopology } from '../../../Common/topologies/Container';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import teamGL from '../../ontology/teamGL';

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
