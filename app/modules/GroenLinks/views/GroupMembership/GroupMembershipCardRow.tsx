import { Property, register } from 'link-redux';
import React from 'react';

import org from '../../../../ontology/org';
import { cardRowTopology } from '../../../Common/topologies';

const GroupMembershipCardRow = () => (
  <Property label={org.organization} />
);

GroupMembershipCardRow.type = org.Membership;

GroupMembershipCardRow.topology = cardRowTopology;

export default register(GroupMembershipCardRow);
