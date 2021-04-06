
import { FC, Property } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { containerTopology } from '../../../topologies/Container';
import Showcase from '../../../topologies/Showcase';

const FeatureShowcase: FC = () => (
  <Showcase>
    <Property label={argu.ns('Features')} />
  </Showcase>
);

FeatureShowcase.type = argu.ns('FeatureShowcase');

FeatureShowcase.topology = containerTopology;

export default FeatureShowcase;
