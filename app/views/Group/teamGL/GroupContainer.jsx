import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import CardContent from '../../../components/Card/CardContent';
import { containerTopology } from '../../../topologies/Container';
import ContentDetails from '../../../topologies/ContentDetails';
import Card from '../../../topologies/Card';

const GroupContainer = () => (
  <Card>
    <CardContent>
      <Property label={schema.name} />
      <ContentDetails>
        <Property label={NS.teamGL('department')} />
        <Property label={NS.teamGL('volunteerCount')} />
      </ContentDetails>
      <Property label={schema.text} />
    </CardContent>
  </Card>
);

GroupContainer.type = [NS.teamGL('Group')];

GroupContainer.topology = [containerTopology];

export default register(GroupContainer);
