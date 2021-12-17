import * as as from '@ontologies/as';
import rdf, {
  NamedNode,
  SomeTerm,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  Property,
  Resource,
  useFields,
  useGlobalIds,
  useIds,
  useLink,
  useLinkRenderContext,
} from 'link-redux';
import React, { ReactNode } from 'react';

import CollectionPreview from '../../components/Collection/CollectionPreview';
import { tryParseInt } from '../../helpers/numbers';
import useActionStatus from '../../hooks/useActionStatus';
import { useCurrentCollectionResource } from '../../hooks/useCurrentCollectionResource';
import { useListToArr } from '../../hooks/useListToArr';
import { SortProps, useSorting } from '../../hooks/useSorting';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { useCollectionStyles } from '../../views/Collection';
import { invalidStatusIds } from '../../views/Thing/properties/omniform/helpers';
import ResourceBoundary from '../ResourceBoundary';

export interface CollectionProps {
  clickToOpen?: boolean;
  collectionDisplay?: NamedNode;
  depth?: number;
  headerButtons?: ReactNode;
  hideHeader?: boolean;
  hidePagination?: boolean;
  onItemClick?: () => void;
  redirectPagination?: boolean;
  renderWhenEmpty?: boolean;
}

export interface CollectionProviderProps extends CollectionProps {
  children?: ReactNode;
  omniform?: boolean;
}

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
  omniform?: boolean;
  onItemClick?: () => void;
  originalCollection: SomeNode;
  redirectPagination?: boolean;
  setCollectionResource: (resource: NamedNode) => void;
  sortOptions: SortProps[];
  view?: NamedNode;
}

export interface CollectionDataProps {
  collectionDisplayFromData: NamedNode;
  maxColumns: SomeTerm;
  partOf: LaxNode;
  totalItems: SomeTerm;
  view?: NamedNode;
}

const propMap = {
  collectionDisplayFromData: ontola.collectionDisplay,
  maxColumns: ontola.maxColumns,
  partOf: as.partOf,
  totalItems: as.totalItems,
  view: ll.view,
};

const CollectionContext = React.createContext<CollectionContext>({} as CollectionContext);

export const useCollectionOptions = (): CollectionContext => React.useContext(CollectionContext);

export const useHasInteraction = (collectionResource: SomeNode): boolean => {
  const [_, actionStatus] = useActionStatus(collectionResource, ontola.createAction);
  const [collectionResourceType] = useGlobalIds(collectionResource, rdfx.type);

  if (collectionResourceType === ontola.SearchResult) {
    return true;
  }

  return actionStatus && !invalidStatusIds.includes(rdf.id(actionStatus));
};

const CollectionProvider = ({
  children,
  clickToOpen,
  collectionDisplay,
  depth,
  headerButtons,
  hideHeader,
  hidePagination,
  omniform,
  onItemClick,
  redirectPagination,
  renderWhenEmpty,
}: CollectionProviderProps): JSX.Element | null => {
  const { subject } = useLinkRenderContext();
  const {
    collectionDisplayFromData,
    maxColumns,
    partOf,
    totalItems,
    view,
  } = useLink(propMap) as CollectionDataProps;
  const originalCollection = partOf ?? subject;
  const [currentCollection, currentCollectionPages, setCollectionResource] = useCurrentCollectionResource(
    !!redirectPagination,
    subject,
  );
  const [firstPageItems] = useFields(currentCollectionPages[0], as.totalItems);

  const [columnSequence] = useIds(originalCollection, ontola.columns);
  const [columns] = useListToArr<NamedNode>(columnSequence);
  const [opened, setOpen] = React.useState(false);
  const resolvedCollectionDisplay = collectionDisplay ?? collectionDisplayFromData;

  const classes = useCollectionStyles();
  const wrapperProps = React.useMemo(() => ({
    className: clsx({
      [classes.collection]: depth,
    }),
  }), [depth]);

  const hasInteraction = useHasInteraction(originalCollection);
  const sortOptions = useSorting(currentCollection);
  const originalFilters = useFields(originalCollection, ontola.collectionFilter);
  const currentFilters = useFields(currentCollection, ontola.collectionFilter);
  const appliedFilters = currentFilters.filter((filter) => !originalFilters.includes(filter));

  const collectionOptions = React.useMemo<CollectionContext>(() => ({
    appliedFilters,
    collectionDisplay: resolvedCollectionDisplay,
    columns,
    currentCollection,
    currentCollectionPages,
    depth,
    hasInteraction,
    headerButtons,
    hideHeader,
    hidePagination,
    maxColumns: tryParseInt(maxColumns),
    omniform,
    onItemClick,
    originalCollection,
    redirectPagination,
    setCollectionResource,
    sortOptions,
    view,
  }), [
    appliedFilters,
    columns,
    resolvedCollectionDisplay,
    currentCollection,
    currentCollectionPages,
    redirectPagination,
    depth,
    hasInteraction,
    headerButtons,
    hideHeader,
    hidePagination,
    maxColumns,
    omniform,
    onItemClick,
    originalCollection,
    setCollectionResource,
    sortOptions,
    view,
  ]);

  if (clickToOpen && depth && depth > 1 && tryParseInt(totalItems) !== 0 && !opened && subject) {
    return (
      <CollectionPreview
        depth={depth}
        setOpen={setOpen}
        subject={subject}
        totalItems={totalItems}
      />
    );
  }

  if (tryParseInt(totalItems || firstPageItems) === 0 && appliedFilters.length === 0 && !renderWhenEmpty) {
    if (clickToOpen) {
      return null;
    }

    if (!hasInteraction || hideHeader) {
      return <div data-test="invalid-status" />;
    }
  }

  if (children) {
    return (
      <CollectionContext.Provider value={collectionOptions}>
        {children}
      </CollectionContext.Provider>
    );
  }

  return (
    <CollectionContext.Provider value={collectionOptions}>
      <ResourceBoundary
        subject={currentCollection}
        wrapperProps={wrapperProps}
      >
        <Resource subject={currentCollection}>
          <Property
            forceRender
            label={ontola.collectionFrame}
          />
        </Resource>
      </ResourceBoundary>
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
