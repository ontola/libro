import * as as from '@ontologies/as';
import { NamedNode, SomeTerm } from '@ontologies/core';
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

const paginationType = (hidePagination: boolean | undefined, collectionType: SomeTerm): NamedNode => {
  if (hidePagination) {
    return as.totalItems;
  }

  if (collectionType === ontola['collectionType/infinite']) {
    return ontola.infinitePagination;
  }

  return ontola.defaultPagination;
};

const Pagination: FC<PaginationProps> = ({ alignText }) => {
  const { hidePagination } = useCollectionOptions();
  const [collectionType] = useProperty(ontola.collectionType);

  const paginationLabel = paginationType(hidePagination, collectionType);

  return (
    <Property
      alignText={alignText}
      forceRender={!hidePagination}
      label={paginationLabel}
    />
  );
};

Pagination.type = CollectionTypes;

Pagination.topology = allTopologies;

Pagination.property = app.pagination;

export default register(Pagination);
