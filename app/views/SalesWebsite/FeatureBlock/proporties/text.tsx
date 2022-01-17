import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import sales from '../../../../ontology/sales';
import { containerTopology } from '../../../../topologies/Container';

const FeatureBlockText : FC<PropertyProps> = ({ linkedProp }): JSX.Element => (
  <Resource subject={linkedProp} />
);

FeatureBlockText.type = sales.FeatureBlock;

FeatureBlockText.property = schema.text;

FeatureBlockText.topology = containerTopology;

export default register(FeatureBlockText);
