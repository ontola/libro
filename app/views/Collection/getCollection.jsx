import as from '@ontologies/as';
import rdf from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  ReturnType,
  linkType,
  lrsType,
  subjectType,
  useDataInvalidation,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import CollectionPreview from '../../components/Collection/CollectionPreview';
import ResourceBoundary from '../../components/ResourceBoundary';
import { listToArr } from '../../helpers/data';
import { tryParseInt } from '../../helpers/numbers';
import { useCurrentCollectionResource } from '../../hooks/useCurrentCollectionResource';
import app from '../../ontology/app';
import argu from '../../ontology/argu';
import ll from '../../ontology/ll';
import ontola from '../../ontology/ontola';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { CollectionTypes } from './types';

export default function getCollection(
  name,
  {
    omniform = false,
    renderWhenEmpty = true,
    topology = [],
  } = {}
) {
  const Collection = (props) => {
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
      lrs,
      maxColumns,
      onItemClick,
      originalCollectionResource: originalCollectionResourceProp,
      redirectPagination,
      renderWhenEmpty: renderWhenEmptyProp,
      renderPartOf,
      renderedPage,
      subject,
      totalItems,
      view,
    } = props;
    const originalCollectionResource = React.useMemo(
      () => originalCollectionResourceProp || subject,
      [originalCollectionResourceProp, subject]
    );
    const [collectionResource, setCollectionResource] = useCurrentCollectionResource(
      redirectPagination,
      originalCollectionResource
    );
    const [collectionResourceType] = useResourceProperty(collectionResource, rdfx.type);
    const [createAction] = useResourceProperty(subject, ontola.createAction);
    const [actionStatus] = useResourceProperty(createAction, schema.actionStatus);

    useEffect(() => {
      if (!collectionResource && renderedPage) {
        setCollectionResource(renderedPage);
      }
    }, [subject, collectionResource, renderedPage]);

    const [opened, setOpen] = React.useState(false);
    const resolvedCollectionDisplay = collectionDisplay || collectionDisplayFromData;
    const resolvedColumns = columns ? listToArr(lrs, [], columns) : undefined;
    useDataInvalidation(collectionResource);

    const childProps = {
      collectionDisplay: resolvedCollectionDisplay,
      columns: resolvedColumns,
      depth,
      maxColumns: tryParseInt(maxColumns),
      onItemClick,
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

    if (clickToOpen && depth && depth > 1 && totalItems.value !== '0' && !opened) {
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

    if (tryParseInt(totalItems) === 0 && collectionFilter.length === 0) {
      if (!renderWhenEmptyProp && !renderWhenEmpty) {
        return <Property label={argu.query} setCurrentPage={setCollectionResource} />;
      }
      if (actionStatus && invalidStatusIds.includes(rdf.id(actionStatus))) {
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

    return (
      <ResourceBoundary subject={collectionResource} wrapperProps={{ className: `Collection Collection__Depth-${depth}` }}>
        {renderPartOf && <Property label={schema.isPartOf} />}
        <Property
          forceRender
          body={body()}
          collectionDisplay={resolvedCollectionDisplay}
          columns={resolvedColumns}
          header={header}
          label={ontola.collectionFrame}
          pagination={pagination}
          setCurrentPage={setCollectionResource}
          onItemClick={onItemClick}
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

  Collection.propTypes = {
    clickToOpen: PropTypes.bool,
    collectionDisplay: linkType,
    collectionDisplayFromData: linkType,
    collectionFilter: PropTypes.arrayOf(linkType),
    collectionType: linkType,
    columns: linkType,
    depth: PropTypes.number,
    hideHeader: PropTypes.bool,
    hidePagination: PropTypes.bool,
    lrs: lrsType,
    maxColumns: linkType,
    originalCollectionResource: linkType,
    redirectPagination: PropTypes.bool,
    renderPartOf: PropTypes.bool,
    renderWhenEmpty: PropTypes.bool,
    renderedPage: linkType,
    subject: subjectType,
    totalItems: linkType,
    view: linkType,
  };

  return Collection;
}
