import * as schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { Resource, linkedPropType } from 'link-redux';
import React from 'react';

import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { navbarTopology } from '../../../topologies/Navbar';

const propTypes = {
  linkedProp: linkedPropType,
};

const ThingOrganizationProp = ({ linkedProp }) => (
  <Resource
    subject={linkedProp}
    topology={navbarTopology}
  />
);

ThingOrganizationProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ThingOrganizationProp,
  schema.Thing,
  ontola.organization,
  allTopologies
);
