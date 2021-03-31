import { FC, register } from 'link-redux';
import React from 'react';

import CollectionProvider from '../../components/Collection/CollectionProvider';
import { tabPaneTopology } from '../../topologies/TabPane';

import { CollectionTypes } from './types';

const CollectionTabPane: FC = (props) => (
  <CollectionProvider
    renderWhenEmpty
    {...props}
  />
);

CollectionTabPane.type = CollectionTypes;

CollectionTabPane.topology = tabPaneTopology;

export default register(CollectionTabPane);
