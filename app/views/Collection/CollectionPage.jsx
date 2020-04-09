import {
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import Metadata from '../../components/Metadata';
import FullResource from '../../topologies/FullResource';
import { pageTopology } from '../../topologies/Page';

import { CollectionTypes } from './types';

const CollectionPage = (props) => (
  <React.Fragment>
    <Metadata />
    <FullResource>
      <Resource partOf redirectPagination {...props} />
    </FullResource>
  </React.Fragment>
);

CollectionPage.type = CollectionTypes;

CollectionPage.topology = pageTopology;

export default register(CollectionPage);
