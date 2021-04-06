import { FC, register } from 'link-redux';
import React from 'react';

import CollectionProvider from '../../components/Collection/CollectionProvider';
import { cardTopology } from '../../topologies/Card';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { fullResourceTopology } from '../../topologies/FullResource';
import { sideBarTopology } from '../../topologies/SideBar';

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
  fullResourceTopology,
  sideBarTopology,
];

export default register(CollectionDefault);
