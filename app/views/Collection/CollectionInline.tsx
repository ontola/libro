import * as as from '@ontologies/as';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { inlineTopology } from '../../topologies/Inline';

import { CollectionTypes } from './types';

const CollectionInline = () => (
  <p>
    <label>
      <Property label={as.name} />
      {' '}
    </label>
    <Property
      forceRender
      insideCollection
      label={ontola.pages}
    />
  </p>
);

CollectionInline.type = CollectionTypes;

CollectionInline.topology = inlineTopology;

export default register(CollectionInline);
