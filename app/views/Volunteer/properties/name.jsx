import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { Heading, LDLink } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const Email = ({ linkedProp }) => (
  <LDLink>
    <Heading size={3}>{linkedProp.value}</Heading>
  </LDLink>
);

Email.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Email,
  NS.teamGL('Volunteer'),
  NS.schema('name'),
  allTopologies
);
