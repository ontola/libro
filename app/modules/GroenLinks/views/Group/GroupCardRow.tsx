import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import teamGL from '../../ontology/teamGL';
import { cardRowTopology } from '../../../../topologies';
import ContentDetails from '../../../../topologies/ContentDetails';
import CardContent from '../../../Common/components/Card/CardContent';

const GroupCardRow = () => (
  <CardContent>
    <Property label={schema.name} />
    <ContentDetails>
      <Property label={[teamGL.department, schema.isPartOf]} />
      <Property label={teamGL.volunteersCount} />
    </ContentDetails>
    <Property label={schema.text} />
  </CardContent>
);

GroupCardRow.type = [teamGL.Group, teamGL.Department];

GroupCardRow.topology = [cardRowTopology];

export default register(GroupCardRow);
