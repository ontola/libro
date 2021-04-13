import * as as from '@ontologies/as';
import rdf, {
  NamedNode,
  SomeTerm,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  Property,
  Resource,
  useDataFetching,
  useLink,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import CollectionPreview from '../../components/Collection/CollectionPreview';
import { tryParseInt } from '../../helpers/numbers';
import { useCurrentCollectionResource } from '../../hooks/useCurrentCollectionResource';
import { useListToArr } from '../../hooks/useListToArr';
import { SortProps, useSorting } from '../../hooks/useSorting';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { invalidStatusIds } from '../../views/Thing/properties/omniform/helpers';
import ResourceBoundary from '../ResourceBoundary';

export interface CollectionProps {
  clickToOpen?: boolean;
  collectionDisplay?: NamedNode;
  depth?: number;
  hideHeader?: boolean;
  hidePagination?: boolean;
  redirectPagination?: boolean;
  renderPartOf?: boolean;
  renderWhenEmpty?: boolean;
  subject: SomeNode;
}

interface CollectionProviderProps extends CollectionProps {
  omniform?: boolean;
}

export interface CollectionContext {
  collectionDisplay?: NamedNode;
  columns?: NamedNode[];
  currentCollection?: SomeNode;
  currentCollectionPages?: SomeNode[];
  depth?: number;
  hasInteraction?: boolean;
  hideHeader?: boolean;
  hidePagination?: boolean;
  maxColumns?: number;
  omniform?: boolean;
  setCollectionResource: (resource: NamedNode) => void;
  sortOptions: SortProps[];
  view?: NamedNode;
}

export interface CollectionDataProps {
  collectionDisplayFromData: NamedNode;
  columns: SomeNode;
  maxColumns: SomeTerm;
  partOf: LaxNode;
  totalItems: SomeTerm;
  view?: NamedNode;
}

const propMap = {
  collectionDisplayFromData: ontola.collectionDisplay,
  columns: ontola.columns,
  maxColumns: ontola.maxColumns,
  partOf: as.partOf,
  totalItems: as.totalItems,
  view: ll.view,
};

const CollectionContext = React.createContext<CollectionContext>({} as CollectionContext);

export const useCollectionOptions = (): CollectionContext => React.useContext(CollectionContext);

export const useHasInteraction = (collectionResource: SomeNode): boolean => {
  const [createAction] = useResourceProperty(collectionResource, ontola.createAction) as NamedNode[];
  useDataFetching(createAction);
  const [actionStatus] = useResourceProperty(createAction, schema.actionStatus) as NamedNode[];

  const [collectionResourceType] = useResourceProperty(collectionResource, rdfx.type) as NamedNode[];

  if (collectionResourceType === ontola.SearchResult) {
    return true;
  }

  return actionStatus && !invalidStatusIds.includes(rdf.id(actionStatus));
};

const CollectionProvider = ({
  clickToOpen,
  collectionDisplay,
  depth,
  hideHeader,
  hidePagination,
  omniform,
  redirectPagination,
  renderWhenEmpty,
  renderPartOf,
  subject,
}: CollectionProviderProps): JSX.Element | null => {
  const {
    collectionDisplayFromData,
    columns,
    maxColumns,
    partOf,
    totalItems,
    view,
  } = useLink(propMap) as CollectionDataProps;
  const originalCollection = partOf || subject;
  const [currentCollection, currentCollectionPages, setCollectionResource] = useCurrentCollectionResource(
    !!redirectPagination,
    subject,
  );
  const [firstPageItems] = useResourceProperty(currentCollectionPages[0], as.totalItems);

  const [opened, setOpen] = React.useState(false);
  const resolvedCollectionDisplay = collectionDisplay || collectionDisplayFromData;
  const columnList = useListToArr<NamedNode>(columns);
  const resolvedColumns = Array.isArray(columnList) ? columnList : undefined;
  const wrapperProps = React.useMemo(() => ({
    className: `Collection Collection__Depth-${depth}`,
  }), [depth]);
  const hasInteraction = useHasInteraction(currentCollection);
  const sortOptions = useSorting(currentCollection);
  const originalFilters = useResourceProperty(originalCollection, ontola.collectionFilter);
  const currentFilters = useResourceProperty(currentCollection, ontola.collectionFilter);
  const appliedFilters = currentFilters.filter((filter) => !originalFilters.includes(filter));

  const collectionOptions = React.useMemo(() => ({
    collectionDisplay: resolvedCollectionDisplay,
    columns: resolvedColumns,
    currentCollection,
    currentCollectionPages,
    depth,
    hasInteraction,
    hideHeader,
    hidePagination,
    maxColumns: tryParseInt(maxColumns),
    omniform,
    setCollectionResource,
    sortOptions,
    view,
  }), [
    resolvedCollectionDisplay,
    currentCollection,
    currentCollectionPages,
    resolvedColumns,
    depth,
    hasInteraction,
    hideHeader,
    hidePagination,
    maxColumns,
    omniform,
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

    if (!hasInteraction) {
      return <div data-test="invalid-status" />;
    }
  }

  return (
    <CollectionContext.Provider value={collectionOptions}>
      <ResourceBoundary subject={currentCollection} wrapperProps={wrapperProps}>
        <Resource subject={currentCollection}>
          {renderPartOf && <Property label={schema.isPartOf} />}
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
