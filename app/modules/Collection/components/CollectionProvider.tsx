import * as as from '@ontologies/as';
import { NamedNode, SomeTerm } from '@ontologies/core';
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

import ll from '../../../ontology/ll';
import ontola from '../../../ontology/ontola';
import useActionStatus from '../../Action/hooks/useActionStatus';
import { isInvalidActionStatus } from '../../Action/hooks/useEnabledActions';
import { useListToArr } from '../../Core/hooks/useListToArr';
import { tryParseInt } from '../../Common/lib/numbers';
import ResourceBoundary from '../../Core/components/ResourceBoundary';
import { useCurrentCollectionResource } from '../hooks/useCurrentCollectionResource';
import { useSorting } from '../hooks/useSorting';
import { useCollectionStyles } from '../views/Collection/useCollectionStyles';

import { CollectionContext, collectionContext } from './CollectionContext';
import CollectionPreview from './CollectionPreview';

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

export const useHasInteraction = (collectionResource: SomeNode): boolean => {
  const [_, actionStatus] = useActionStatus(collectionResource, ontola.createAction);
  const [collectionResourceType] = useGlobalIds(collectionResource, rdfx.type);

  if (collectionResourceType === ontola.SearchResult) {
    return true;
  }

  return actionStatus && !isInvalidActionStatus(actionStatus);
};

const CollectionProvider = ({
  children,
  clickToOpen,
  collectionDisplay,
  depth,
  headerButtons,
  hideHeader,
  hidePagination,
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
  }), [depth, classes.collection]);

  const hasInteraction = useHasInteraction(originalCollection);
  const sortOptions = useSorting(currentCollection);
  const originalFilters = useFields(originalCollection, ontola.activeFilters);
  const activeFilters = useFields(currentCollection, ontola.activeFilters);
  const appliedFilters = activeFilters.filter((filter) => !originalFilters.includes(filter));

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
      <collectionContext.Provider value={collectionOptions}>
        {children}
      </collectionContext.Provider>
    );
  }

  return (
    <collectionContext.Provider value={collectionOptions}>
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
    </collectionContext.Provider>
  );
};

export default CollectionProvider;