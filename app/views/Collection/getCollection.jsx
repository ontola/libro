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
import { Redirect } from 'react-router';

import CollectionPreview from '../../components/Collection/CollectionPreview';
import ResourceBoundary from '../../components/ResourceBoundary';
import { listToArr } from '../../helpers/data';
import { retrievePath } from '../../helpers/iris';
import { tryParseInt } from '../../helpers/numbers';
import { useCurrentCollectionResource } from '../../hooks/useCurrentCollectionResource';
import argu from '../../ontology/argu';
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
      redirectPagination,
      renderWhenEmpty: renderWhenEmptyProp,
      renderPartOf,
      renderedPage,
      subject,
      totalItems,
    } = props;
    const [collectionResource, setCollectionResource] = useCurrentCollectionResource(
      redirectPagination,
      renderedPage
    );
    const [collectionResourcePartOf] = useResourceProperty(collectionResource, schema.isPartOf);
    const [collectionResourceType] = useResourceProperty(collectionResource, rdfx.type);

    useEffect(() => {
      if (!collectionResource && renderedPage) {
        setCollectionResource(renderedPage);
      }
    }, [collectionResource, renderedPage]);

    const [opened, setOpen] = React.useState(false);
    const resolvedCollectionDisplay = collectionDisplay || collectionDisplayFromData;
    const resolvedColumns = columns ? listToArr(lrs, [], columns) : undefined;
    useDataInvalidation(collectionResource);

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

    if (collectionResource) {
      if (redirectPagination && collectionResource !== renderedPage && renderedPage) {
        return <Redirect to={retrievePath(collectionResource.value)} />;
      }

      if (typeof collectionResourceType === 'undefined' || CollectionTypes.includes(collectionResourceType)) {
        return <Resource subject={collectionResource} />;
      }

      if (collectionResourcePartOf && collectionResourcePartOf !== subject) {
        return <Resource subject={collectionResourcePartOf} />;
      }
    }

    const body = () => {
      if (collectionResource) {
        return (
          <Resource
            forceRender
            insideCollection
            collectionDisplay={resolvedCollectionDisplay}
            columns={resolvedColumns}
            depth={depth}
            subject={collectionResource}
          />
        );
      }

      return (
        <Property
          forceRender
          insideCollection
          collectionDisplay={resolvedCollectionDisplay}
          columns={resolvedColumns}
          depth={depth}
          label={ontola.pages}
        />
      );
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
      const createAction = lrs.getResourceProperty(subject, ontola.createAction);
      const actionStatus = createAction
        && lrs.getResourceProperty(createAction, schema.actionStatus);
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
          collectionDisplay={collectionDisplay}
          collectionResource={collectionResource}
          columns={resolvedColumns}
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
    collectionType: ontola.collectionType,
    columns: ontola.columns,
    defaultType: ontola.defaultType,
    pages: {
      label: ontola.pages,
      returnType: ReturnType.AllTerms,
    },
    totalItems: as.totalItems,
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
    redirectPagination: PropTypes.bool,
    renderPartOf: PropTypes.bool,
    renderWhenEmpty: PropTypes.bool,
    renderedPage: linkType,
    subject: subjectType,
    totalItems: linkType,
  };

  return Collection;
}
