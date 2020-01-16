import as from '@ontologies/as';
import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import {
  Property,
  Resource,
  linkedPropType,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const VoteEvents = ({ linkedProp }) => (
  <Resource
    subject={linkedProp}
  >
    <Property label={as.items} />
  </Resource>
);

VoteEvents.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  VoteEvents,
  schema.Thing,
  argu.ns('voteEvents'),
  allTopologies
);
