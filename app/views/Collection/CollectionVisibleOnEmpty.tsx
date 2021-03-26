import { FC, register } from 'link-redux';
import React from 'react';

import CollectionProvider, { EMPTY_STRATEGY } from '../../components/Collection/CollectionProvider';
import { fullResourceTopology } from '../../topologies/FullResource';
import { gridTopology } from '../../topologies/Grid';
import { tabPaneTopology } from '../../topologies/TabPane';

import { CollectionTypes } from './types';

const CollectionVisibleOnEmpty: FC = (props) => (
  <CollectionProvider
    emptyStrategy={EMPTY_STRATEGY.Always}
    {...props}
  />
);

CollectionVisibleOnEmpty.type = CollectionTypes;

CollectionVisibleOnEmpty.topology = [
  fullResourceTopology,
  gridTopology,
  tabPaneTopology,
];

export default register(CollectionVisibleOnEmpty);
