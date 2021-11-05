import { FC, register } from 'link-redux';
import React from 'react';

import CollectionProvider from '../../components/Collection/CollectionProvider';
import { containerTopology } from '../../topologies/Container';

import { CollectionTypes } from './types';

const CollectionContainer: FC = (props) => (
  <CollectionProvider
    omniform
    {...props}
  />
);

CollectionContainer.type = CollectionTypes;

CollectionContainer.topology = containerTopology;

export default register(CollectionContainer);
