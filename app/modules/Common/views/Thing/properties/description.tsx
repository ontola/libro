import * as schema from '@ontologies/schema';
import * as sh from '@ontologies/shacl';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../../topologies';

const Description = ({ linkedProp }: PropertyProps): JSX.Element => (
  <p>
    {linkedProp.value}
  </p>
);

Description.type = [
  schema.Thing,
  sh.Shape,
  sh.NodeShape,
];

Description.property = [
  schema.description,
  sh.description,
];

Description.topology = allTopologies;

export default register(Description);
