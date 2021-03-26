import { FC, register } from 'link-redux';
import React from 'react';

import CollectionProvider, { EMPTY_STRATEGY } from '../../components/Collection/CollectionProvider';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';

import { CollectionTypes } from './types';

const CollectionCard: FC = (props) => (
  <CollectionProvider
    emptyStrategy={EMPTY_STRATEGY.Interactable}
    {...props}
  />
);

CollectionCard.type = CollectionTypes;

CollectionCard.topology = [
  cardTopology,
  cardMainTopology,
];

export default register(CollectionCard);
