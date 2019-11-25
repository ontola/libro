import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { inlineTopology } from '../../../topologies/Inline';

const IconAttribute = ({ linkedProp }) => (
  <li><LinkedResourceContainer subject={linkedProp} topology={inlineTopology} /></li>
);

IconAttribute.type = schema.Thing;

IconAttribute.topology = allTopologies;

IconAttribute.property = NS.rivm('natureOfCosts');

IconAttribute.propTypes = {
  linkedProp: linkedPropType,
};

export default register(IconAttribute);
