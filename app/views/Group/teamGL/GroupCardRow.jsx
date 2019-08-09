import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import CardContent from '../../../components/Card/CardContent';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import ContentDetails from '../../../topologies/ContentDetails';

const GroupCardRow = () => (
  <CardContent>
    <Property label={NS.schema('name')} />
    <ContentDetails>
      <Property label={NS.teamGL('volunteerCount')} />
    </ContentDetails>
    <Property label={NS.schema('text')} />
  </CardContent>
);

GroupCardRow.type = [NS.teamGL('Group')];

GroupCardRow.topology = [cardRowTopology];

export default register(GroupCardRow);
