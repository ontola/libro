import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { Heading, LDLink } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologiesExcept } from '../../../topologies';
import { selectTopology } from '../../../topologies/Select';

const propTypes = {
  linkedProp: linkedPropType,
};

const Name = ({ linkedProp }) => (
  <LDLink>
    <Heading size={3}>{linkedProp.value}</Heading>
  </LDLink>
);

Name.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Name,
  NS.teamGL('Volunteer'),
  schema.name,
  allTopologiesExcept(selectTopology)
);
