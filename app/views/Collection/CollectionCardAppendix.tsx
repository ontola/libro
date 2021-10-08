import * as as from '@ontologies/as';
import {
  FC,
  Property,
  register,
  useNumbers,
} from 'link-redux';
import React from 'react';

import useCollectionRefresh from '../../components/Collection/useCollectionRefresh';
import ResourceBoundary from '../../components/ResourceBoundary';
import ontola from '../../ontology/ontola';
import { cardAppendixTopology } from '../../topologies/Card/CardAppendix';

import { CollectionTypes } from './types';

const CollectionCardAppendix: FC = ({
  subject,
}) => {
  const [totalItems] = useNumbers(as.totalItems);
  useCollectionRefresh(subject);

  if (totalItems === 0) {
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
