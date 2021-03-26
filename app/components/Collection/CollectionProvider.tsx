import * as as from '@ontologies/as';
import rdf, {
  NamedNode,
  SomeTerm,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  Property,
  Resource,
  useDataFetching,
  useDataInvalidation,
  useLRS,
  useLink,
  useProperty,
  useResourceProperty,
} from 'link-redux';
import React, { useEffect } from 'react';

import CollectionPreview from '../../components/Collection/CollectionPreview';
import ResourceBoundary from '../../components/ResourceBoundary';
import { listToArr } from '../../helpers/data';
import { tryParseInt } from '../../helpers/numbers';
import { useCurrentCollectionResource } from '../../hooks/useCurrentCollectionResource';
import { SortProps, useSorting } from '../../hooks/useSorting';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { CollectionTypes } from '../../views/Collection/types';
import { invalidStatusIds } from '../../views/Thing/properties/omniform/helpers';

export enum EMPTY_STRATEGY {
  Always = 0,
  Interactable = 2,
  Never = 1,
}

export interface CollectionProps {
  clickToOpen?: boolean;
  collectionDisplay?: NamedNode;
  depth?: number;
  hideHeader?: boolean;
  hidePagination?: boolean;
  originalCollectionResource?: NamedNode;
  redirectPagination?: boolean;
  renderPartOf?: boolean;
  renderWhenEmpty?: boolean;
  renderedPage?: NamedNode;
  subject: SomeNode;
}

interface CollectionProviderProps extends CollectionProps {
  omniform?: boolean;
  emptyStrategy: EMPTY_STRATEGY;
}

export interface CollectionContext {
  collectionDisplay?: NamedNode;
  collectionResource?: SomeNode;
  collectionResourceType?: NamedNode;
  columns?: NamedNode[];
  depth?: number;
  emptyStrategy: EMPTY_STRATEGY;
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
  totalItems: SomeTerm;
  view?: NamedNode;
}

const propMap = {
  collectionDisplayFromData: ontola.collectionDisplay,
  columns: ontola.columns,
  maxColumns: ontola.maxColumns,
  totalItems: as.totalItems,
  view: ll.view,
};

const CollectionContext = React.createContext<CollectionContext>({} as CollectionContext);

export const useCollectionOptions = (): CollectionContext => React.useContext(CollectionContext);

const collectionHasInteraction = (actionStatus: SomeTerm, collectionResourceType: NamedNode) => {
  if (collectionResourceType === ontola.SearchResult) {
    return true;
  }

  return actionStatus && !invalidStatusIds.includes(rdf.id(actionStatus));
};

const CollectionProvider = ({
  clickToOpen,
  collectionDisplay,
  depth,
  emptyStrategy,
  hideHeader,
  hidePagination,
  omniform,
  redirectPagination,
  renderWhenEmpty,
  renderPartOf,
  renderedPage,
  subject,
}: CollectionProviderProps): JSX.Element | null => {
  const {
    collectionResource: originalCollectionResource,
  } = useCollectionOptions();
  const {
    collectionDisplayFromData,
    columns,
    maxColumns,
    totalItems,
    view,
  } = useLink(propMap) as CollectionDataProps;
  const collectionFilters = useProperty(ontola.collectionFilter);
  const lrs = useLRS();
  const [collectionResource, setCollectionResource] = useCurrentCollectionResource(
    !!redirectPagination,
    originalCollectionResource ?? subject,
  );
  const [collectionResourceType] = useResourceProperty(collectionResource, rdfx.type) as NamedNode[];
  const [createAction] = useResourceProperty(subject, ontola.createAction) as NamedNode[];
  useDataFetching(createAction);
  const [actionStatus] = useResourceProperty(createAction, schema.actionStatus) as NamedNode[];

  useEffect(() => {
    if (!collectionResource && renderedPage) {
      setCollectionResource(renderedPage);
    }
  }, [subject, collectionResource, renderedPage]);

  const [opened, setOpen] = React.useState(false);
  const resolvedCollectionDisplay = collectionDisplay || collectionDisplayFromData;
  const columnList = columns ? listToArr<NamedNode>(lrs, [], columns) : undefined;
  const resolvedColumns = Array.isArray(columnList) ? columnList : undefined;
  useDataInvalidation(collectionResource);
  const wrapperProps = React.useMemo(() => ({
    className: `Collection Collection__Depth-${depth}`,
  }), [depth]);
  const hasInteraction = collectionHasInteraction(actionStatus, collectionResourceType);
  const sortOptions = useSorting();

  const collectionOptions = React.useMemo(() => ({
    collectionDisplay: resolvedCollectionDisplay,
    collectionResource,
    collectionResourceType,
    columns: resolvedColumns,
    depth,
    emptyStrategy,
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
    collectionResource,
    collectionResourceType,
    resolvedColumns,
    depth,
    emptyStrategy,
    hasInteraction,
    hideHeader,
    hidePagination,
    maxColumns,
    omniform,
    setCollectionResource,
    sortOptions,
    view,
  ]);

  const mainCollectionIsOverwritten = collectionResource
    && CollectionTypes.includes(collectionResourceType)
    && collectionResource !== subject;

  if (mainCollectionIsOverwritten) {
    return (
      <CollectionContext.Provider value={collectionOptions}>
        <Resource subject={collectionResource} />
      </CollectionContext.Provider>
    );
  }

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

  if (tryParseInt(totalItems) === 0 && collectionFilters.length === 0 && !renderWhenEmpty) {
    if (emptyStrategy === EMPTY_STRATEGY.Never) {
      return <Property label={ontola.query} />;
    }
    if (clickToOpen) {
      return null;
    }
    if (emptyStrategy === EMPTY_STRATEGY.Interactable
      && !collectionHasInteraction(actionStatus, collectionResourceType)) {
      return <div data-test="invalid-status" />;
    }
  }

  return (
    <CollectionContext.Provider value={collectionOptions}>
      <ResourceBoundary subject={collectionResource} wrapperProps={wrapperProps}>
        {renderPartOf && <Property label={schema.isPartOf} />}
        <Property
          forceRender
          label={ontola.collectionFrame}
        />
      </ResourceBoundary>
    </CollectionContext.Provider>
  );
};

export default CollectionProvider;
