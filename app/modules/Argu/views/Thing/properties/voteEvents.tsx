import * as as from '@ontologies/as';
import { Node } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { allTopologies } from '../../../../../topologies';

interface VoteEventProps {
  linkedProp: Node;
}

const VoteEvents = ({ linkedProp }: VoteEventProps): JSX.Element => (
  <Resource
    subject={linkedProp}
  >
    <Property label={as.items} />
  </Resource>
);

VoteEvents.type = schema.Thing;

VoteEvents.property = argu.voteEvents;

VoteEvents.topology = allTopologies;

export default register(VoteEvents);
