import * as schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import rivm from '../../../ontology/rivm';
import { allTopologies } from '../../../topologies';
import { inlineTopology } from '../../../topologies/Inline';

const NatureOfCost = ({ linkedProp }) => (
  <div><Resource subject={linkedProp} topology={inlineTopology} /></div>
);

NatureOfCost.type = schema.Thing;

NatureOfCost.topology = allTopologies;

NatureOfCost.property = rivm.natureOfCosts;

NatureOfCost.propTypes = {
  linkedProp: linkedPropType,
};

export default register(NatureOfCost);
