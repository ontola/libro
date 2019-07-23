import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { cardRowTopology } from '../../topologies/Card/CardRow';

const GroupMembershipCardRow = () => (
  <Property label={NS.org('organization')} />
);

GroupMembershipCardRow.type = NS.org('Membership');

GroupMembershipCardRow.topology = cardRowTopology;

export default register(GroupMembershipCardRow);
