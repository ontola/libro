import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import rivm from '../../../../ontology/rivm';
import { allTopologies, inlineTopology } from '../../../../topologies';

const NatureOfCost: FC<PropertyProps> = ({ linkedProp }) => (
  <div>
    <Resource
      subject={linkedProp}
      topology={inlineTopology}
    />
  </div>
);

NatureOfCost.type = schema.Thing;

NatureOfCost.topology = allTopologies;

NatureOfCost.property = rivm.natureOfCosts;

export default register(NatureOfCost);
