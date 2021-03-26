import { FC, register } from 'link-redux';
import React from 'react';

import CollectionProvider, { EMPTY_STRATEGY } from '../../components/Collection/CollectionProvider';
import { containerTopology } from '../../topologies/Container';

import { CollectionTypes } from './types';

const CollectionWithOmniform: FC = (props) => (
  <CollectionProvider
    omniform
    emptyStrategy={EMPTY_STRATEGY.Interactable}
    {...props}
  />
);

CollectionWithOmniform.type = CollectionTypes;

CollectionWithOmniform.topology = [
  containerTopology,
];

export default register(CollectionWithOmniform);
