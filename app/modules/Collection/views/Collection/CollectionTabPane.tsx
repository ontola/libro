import { FC, register } from 'link-redux';
import React from 'react';

import { tabPaneTopology } from '../../../Common/topologies';
import CollectionProvider from '../../components/CollectionProvider';

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
