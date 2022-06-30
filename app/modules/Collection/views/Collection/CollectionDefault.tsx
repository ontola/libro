import { FC, register } from 'link-redux';
import React from 'react';

import { cardTopology } from '../../../Common/topologies/Card';
import { cardMainTopology } from '../../../Common/topologies/Card/CardMain';
import { containerTopology } from '../../../Common/topologies/Container';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import { mainBodyTopology } from '../../../Common/topologies/MainBody';
import { sideBarTopology } from '../../../Common/topologies/SideBar';
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
