import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import org from '../../../../ontology/org';
import { cardRowTopology } from '../../../../topologies/Card/CardRow';

const GroupMembershipCardRow = () => (
  <Property label={org.organization} />
);

GroupMembershipCardRow.type = org.Membership;

GroupMembershipCardRow.topology = cardRowTopology;

export default register(GroupMembershipCardRow);
