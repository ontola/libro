import * as as from '@ontologies/as';
import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  ReturnType,
  useDataFetching,
  useDataInvalidation,
  useLRS,
  useResourceProperty,
} from 'link-redux';
import React, { useEffect } from 'react';

import CollectionPreview from '../../components/Collection/CollectionPreview';
import ResourceBoundary from '../../components/ResourceBoundary';
import { listToArr } from '../../helpers/data';
import { tryParseInt } from '../../helpers/numbers';
import { useCurrentCollectionResource } from '../../hooks/useCurrentCollectionResource';
import app from '../../ontology/app';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { CollectionTypes } from './types';

export enum EMPTY_STRATEGY {
  Always = 0,
  Interactable = 2,
  Never = 1,
}

interface GetCollectionOpts {
  omniform?: boolean;
  emptyStrategy?: EMPTY_STRATEGY;
  topology?: NamedNode[];
}

interface CollectionProps {
  clickToOpen: boolean;
  collectionDisplay: SomeTerm;
  collectionDisplayFromData: SomeTerm;
  collectionFilter: SomeTerm[];
  collectionType: SomeTerm;
  columns: SomeNode[];
  depth: number;
  hideHeader: boolean;
  hidePagination: boolean;
  maxColumns: SomeTerm;
  originalCollectionResource: NamedNode;
  redirectPagination: boolean;
  renderPartOf: boolean;
  renderWhenEmpty: boolean;
  renderedPage: NamedNode;
  totalItems: SomeTerm;
  view: SomeTerm;
}

const collectionHasInteraction = (actionStatus: SomeTerm, collectionResourceType: NamedNode) => {
  if (collectionResourceType === ontola.SearchResult) {
    return true;
  }

  return actionStatus && !invalidStatusIds.includes(rdf.id(actionStatus));
};

export default function getCollection(
  name: string,
  opts: GetCollectionOpts = {},
): FC<CollectionProps> {
  const {
    omniform = false,
    emptyStrategy = EMPTY_STRATEGY.Interactable,
    topology = [],
  } = opts;

  const Collection: FC<CollectionProps> & { displayName?: string } = (props) => {
    const {
      clickToOpen,
      collectionDisplay,
      collectionDisplayFromData,
      collectionFilter,
      collectionType,
      columns,
      depth,
      hideHeader,
      hidePagination,
      maxColumns,
      originalCollectionResource: originalCollectionResourceProp,
      redirectPagination,
      renderWhenEmpty,
      renderPartOf,
      renderedPage,
      subject,
      totalItems,
      view,
    } = props;
    const lrs = useLRS();
    const originalCollectionResource = React.useMemo(
      () => originalCollectionResourceProp || subject,
      [originalCollectionResourceProp, subject],
    );
    const [collectionResource, setCollectionResource] = useCurrentCollectionResource(
      redirectPagination,
      originalCollectionResource,
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
    const resolvedColumns = columns ? listToArr(lrs, [], columns) : undefined;
    useDataInvalidation(collectionResource);
    const wrapperProps = React.useMemo(() => ({
      className: `Collection Collection__Depth-${depth}`,
    }), [depth]);

    const childProps = {
      collectionDisplay: resolvedCollectionDisplay,
      columns: resolvedColumns,
      depth,
      maxColumns: tryParseInt(maxColumns),
      originalCollectionResource,
      view,
    };

    const mainCollectionIsOverwritten = collectionResource
      && CollectionTypes.includes(collectionResourceType)
      && collectionResource !== subject;

    if (mainCollectionIsOverwritten) {
      return (
        <Resource
          subject={collectionResource}
          {...childProps}
        />
      );
    }

    if (clickToOpen && depth && depth > 1 && totalItems.value !== '0' && !opened && subject) {
      return (
        <CollectionPreview
          depth={depth}
          setOpen={setOpen}
          subject={subject}
          totalItems={totalItems}
        />
      );
    }

    const body = () => {
      if (!collectionResource || collectionResource === subject) {
        return (
          <Property
            forceRender
            insideCollection
            label={ontola.pages}
            {...childProps}
          />
        );
      } else if (collectionResource) {
        return (
          <Resource
            forceRender
            insideCollection
            subject={collectionResource}
            {...childProps}
          />
        );
      }

      return null;
    };

    let pagination;
    if (hidePagination) {
      pagination = <Property label={as.totalItems} />;
    } else {
      switch (rdf.id(collectionType)) {
        case rdf.id(ontola['collectionType/infinite']):
          pagination = (
            <Property
              forceRender
              label={ontola.infinitePagination}
            />
          );
          break;
        default:
          pagination = (
            <Property
              forceRender
              collectionResource={collectionResource}
              label={ontola.defaultPagination}
              setCurrentPage={setCollectionResource}
            />
          );
      }
    }

    if (tryParseInt(totalItems) === 0 && collectionFilter.length === 0 && !renderWhenEmpty) {
      if (emptyStrategy === EMPTY_STRATEGY.Never) {
        return <Property label={ontola.query} setCurrentPage={setCollectionResource} />;
      }
      if (emptyStrategy === EMPTY_STRATEGY.Interactable
        && !collectionHasInteraction(actionStatus, collectionResourceType)) {
        return <div data-test="invalid-status" />;
      }
    }

    const header = (!depth || depth === 0) && !hideHeader && (
      <Property
        forceRender
        collectionDisplay={resolvedCollectionDisplay}
        label={ontola.header}
        omniform={omniform}
        setCurrentPage={setCollectionResource}
      />
    );

    const footer = (!depth || depth === 0) && !hideHeader && (
      <Property
        forceRender
        collectionDisplay={resolvedCollectionDisplay}
        label={ontola.footer}
        omniform={omniform}
        setCurrentPage={setCollectionResource}
      />
    );

    return (
      <ResourceBoundary subject={collectionResource} wrapperProps={wrapperProps}>
        {renderPartOf && <Property label={schema.isPartOf} />}
        <Property
          forceRender
          body={body()}
          collectionDisplay={resolvedCollectionDisplay}
          columns={resolvedColumns}
          footer={footer}
          header={header}
          label={ontola.collectionFrame}
          pagination={pagination}
          setCurrentPage={setCollectionResource}
        />
      </ResourceBoundary>
    );
  };

  Collection.displayName = `Collection(${name})`;

  Collection.type = CollectionTypes;

  Collection.topology = topology;

  Collection.mapDataToProps = {
    collectionDisplayFromData: ontola.collectionDisplay,
    collectionFilter: {
      label: ontola.collectionFilter,
      returnType: ReturnType.AllTerms,
    },
    collectionResource: app.collectionResource,
    collectionType: ontola.collectionType,
    columns: ontola.columns,
    defaultType: ontola.defaultType,
    maxColumns: ontola.maxColumns,
    pages: {
      label: ontola.pages,
      returnType: ReturnType.AllTerms,
    },
    totalItems: as.totalItems,
    view: ll.view,
  };

  return Collection;
}
