import * as as from '@ontologies/as';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { tryParseInt } from '../../../Common/lib/numbers';
import { cardAppendixTopology } from '../../../Common/topologies';
import ResourceBoundary from '../../../Common/components/ResourceBoundary';
import ontola from '../../../Kernel/ontology/ontola';

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
