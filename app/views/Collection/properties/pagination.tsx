import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { useCollectionOptions } from '../../../components/Collection/CollectionProvider';
import app from '../../../ontology/app';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import { CollectionTypes } from '../types';

interface PaginationProps {
  linkedProp: SomeNode;
}

const Pagination: FC<PaginationProps> = () => {
  const { hidePagination } = useCollectionOptions();
  const [collectionType] = useProperty(ontola.collectionType);

  if (hidePagination) {
    return (
      <Property label={as.totalItems} />
    );
  } else if (rdf.id(collectionType) === rdf.id(ontola['collectionType/infinite'])) {
    return (
      <Property
        forceRender
        label={ontola.infinitePagination}
      />
    );
  }

  return (
    <Property
      forceRender
      label={ontola.defaultPagination}
    />
  );
};

Pagination.type = CollectionTypes;

Pagination.topology = allTopologies;

Pagination.property = app.pagination;

export default register(Pagination);