
import { FC, Property } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';

const FeatureShowcaseContainer: FC = () => (
  <Showcase>
    <Property label={argu.ns('features')} />
  </Showcase>
);

FeatureShowcaseContainer.type = argu.ns('FeatureShowcase');

FeatureShowcaseContainer.topology = containerTopology;

export default FeatureShowcaseContainer;
