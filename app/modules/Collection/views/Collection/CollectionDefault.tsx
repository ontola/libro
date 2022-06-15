import { FC, register } from 'link-redux';
import React from 'react';

import {
  cardMainTopology,
  cardTopology,
  containerTopology,
  fullResourceTopology,
  mainBodyTopology,
  sideBarTopology,
} from '../../../../topologies';
import CollectionProvider from '../../components/CollectionProvider';

import { CollectionTypes } from './types';

const CollectionDefault: FC = (props) => (
  <CollectionProvider
    {...props}
  />
);

CollectionDefault.type = CollectionTypes;

CollectionDefault.topology = [
  cardTopology,
  cardMainTopology,
  containerTopology,
  mainBodyTopology,
  fullResourceTopology,
  sideBarTopology,
];

export default register(CollectionDefault);
