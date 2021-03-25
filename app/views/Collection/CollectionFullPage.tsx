import {
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import Metadata from '../../components/Metadata';
import FullResource from '../../topologies/FullResource';
import { pageTopology } from '../../topologies/Page';
import { CollectionViewTypes } from '../CollectionPage/types';

import { CollectionTypes } from './types';

const CollectionFullPage = (props: Record<string, unknown>) => (
  <React.Fragment>
    <Metadata />
    <FullResource>
      <Resource redirectPagination renderPartOf {...props} />
    </FullResource>
  </React.Fragment>
);

CollectionFullPage.type = [...CollectionTypes, ...CollectionViewTypes];

CollectionFullPage.topology = pageTopology;

export default register(CollectionFullPage);
