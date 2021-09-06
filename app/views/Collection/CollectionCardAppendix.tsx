import * as as from '@ontologies/as';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import { tryParseInt } from '../../helpers/numbers';
import ontola from '../../ontology/ontola';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';

import { CollectionTypes } from './types';

const CollectionCardAppendix = () => {
  const [totalItems] = useProperty(as.totalItems);

  if (tryParseInt(totalItems) === 0) {
    return null;
  }

  return (
    <ResourceBoundary>
      <Property
        forceRender
        insideCollection
        label={ontola.pages}
      />
    </ResourceBoundary>
  );
};

CollectionCardAppendix.type = CollectionTypes;

CollectionCardAppendix.topology = cardAppendixTopology;

export default register(CollectionCardAppendix);
