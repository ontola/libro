import { NamedNode, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React, { ReactNode } from 'react';

import { SortProps } from '../../hooks/useSorting';

export interface CollectionContext {
  appliedFilters: SomeTerm[];
  collectionDisplay?: NamedNode;
  columns: NamedNode[];
  currentCollection?: SomeNode;
  currentCollectionPages?: SomeNode[];
  depth?: number;
  hasInteraction?: boolean;
  headerButtons?: ReactNode;
  hideHeader?: boolean;
  hidePagination?: boolean;
  maxColumns?: number;
  onItemClick?: () => void;
  originalCollection: SomeNode;
  redirectPagination?: boolean;
  setCollectionResource: (resource: NamedNode) => void;
  sortOptions: SortProps[];
  view?: NamedNode;
}

export const collectionContext = React.createContext<CollectionContext>({} as CollectionContext);
export const useCollectionOptions = (): CollectionContext => React.useContext(collectionContext);
