import { FC, register } from 'link-redux';
import React from 'react';

import CollectionProvider from '../../components/Collection/CollectionProvider';
import { containerTopology } from '../../topologies/Container';
import { alertDialogTopology } from '../../topologies/Dialog';

import { CollectionTypes } from './types';

const CollectionWithOmniform: FC = (props) => (
  <CollectionProvider
    omniform
    {...props}
  />
);

CollectionWithOmniform.type = CollectionTypes;

CollectionWithOmniform.topology = [
  alertDialogTopology,
  containerTopology,
];

export default register(CollectionWithOmniform);
