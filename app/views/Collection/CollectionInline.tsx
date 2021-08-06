import * as as from '@ontologies/as';
import * as rdfx from '@ontologies/rdf';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { inlineTopology } from '../../topologies/Inline';

import { CollectionTypes } from './types';

const CollectionInline: FC = () => (
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

CollectionInline.mapDataToProps = {
  type: rdfx.type,
};

CollectionInline.topology = inlineTopology;

export default register(CollectionInline);
