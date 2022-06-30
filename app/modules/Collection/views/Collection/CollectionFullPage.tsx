import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import Metadata from '../../../Common/components/Metadata';
import FullResource from '../../../Common/topologies/FullResource';
import { pageTopology } from '../../../Common/topologies/Page';
import { CollectionViewTypes } from '../CollectionPage/types';

import { CollectionTypes } from './types';

const CollectionFullPage: FC = ({
  subject,
}) => (
  <React.Fragment>
    <Metadata />
    <FullResource>
      <Property label={schema.isPartOf} />
      <Resource
        redirectPagination
        renderWhenEmpty
        subject={subject}
      />
    </FullResource>
  </React.Fragment>
);

CollectionFullPage.type = [...CollectionTypes, ...CollectionViewTypes];

CollectionFullPage.topology = pageTopology;

export default register(CollectionFullPage);
