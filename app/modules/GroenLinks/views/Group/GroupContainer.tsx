import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import teamGL from '../../ontology/teamGL';
import { containerTopology } from '../../../../topologies';
import Card from '../../../../topologies/Card';
import ContentDetails from '../../../../topologies/ContentDetails';
import CardContent from '../../../Common/components/Card/CardContent';

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
