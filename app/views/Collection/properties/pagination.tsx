import * as as from '@ontologies/as';
import rdf from '@ontologies/core';
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

import { PaginationProps } from './defaultPagination';

const Pagination: FC<PaginationProps> = ({ alignText }) => {
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
      alignText={alignText}
      label={ontola.defaultPagination}
    />
  );
};

Pagination.type = CollectionTypes;

Pagination.topology = allTopologies;

Pagination.property = app.pagination;

export default register(Pagination);
