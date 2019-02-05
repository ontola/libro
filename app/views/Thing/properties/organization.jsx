import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { navbarTopology } from '../../../topologies/Navbar';

const propTypes = {
  linkedProp: linkedPropType,
};

const ThingOrganizationProp = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
    topology={navbarTopology}
  />
);

ThingOrganizationProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ThingOrganizationProp,
  NS.schema('Thing'),
  NS.schema('organization'),
  allTopologies
);
