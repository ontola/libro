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
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';

import Heading from '../../components/Heading';
import LinkDuo from '../../components/LinkDuo';
import ResourceBoundary from '../../components/ResourceBoundary';
import { listToArr } from '../../helpers/data';
import { retrievePath } from '../../helpers/iris';
import { tryParseInt } from '../../helpers/numbers';
import { useCurrentPage } from '../../hooks/useCurrentPage';
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
  const Collection = ({
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
    partOf,
    redirectPagination,
    renderWhenEmpty: renderWhenEmptyProp,
    renderedPage,
    subject,
    totalItems,
  }) => {
    const [currentPage, setCurrentPage] = useCurrentPage(redirectPagination, renderedPage);
    const [currentPagePartOf] = useResourceProperty(currentPage, schema.isPartOf);
    const [currentPageType] = useResourceProperty(currentPage, rdfx.type);

    useEffect(() => {
      if (!currentPage && renderedPage) {
        setCurrentPage(renderedPage);
      }
    }, [currentPage, renderedPage]);

    const [opened, setOpen] = React.useState(false);
    const resolvedCollectionDisplay = collectionDisplay || collectionDisplayFromData;
    const resolvedColumns = columns ? listToArr(lrs, [], columns) : undefined;
    useDataInvalidation(currentPage);

    if (clickToOpen && depth && depth > 1 && totalItems.value !== '0' && !opened) {
      const open = (e) => {
        if (e) {
          e.preventDefault();
        }
        setOpen(true);
      };

      return (
        <ResourceBoundary
          element={Heading}
          wrapperProps={{
            className: `Collection__Depth-${depth}`,
            size: 5,
          }}
        >
          <LinkDuo
            className={`Collection__Depth-${depth + 1}`}
            to={subject.value}
            onClick={open}
            onKeyUp={open}
          >
            <FormattedMessage
              defaultMessage="Show {count} additional replies..."
              id="https://app.argu.co/i18n/collections/showRepliesLabel"
              values={{
                count: totalItems.value,
              }}
            />
          </LinkDuo>
        </ResourceBoundary>
      );
    }

    if (currentPage) {
      if (redirectPagination && currentPage !== renderedPage && renderedPage) {
        return <Redirect to={retrievePath(currentPage.value)} />;
      }

      if (typeof currentPageType === 'undefined' || CollectionTypes.includes(currentPageType)) {
        return <Resource data-debug={(depth || -1) + 1} subject={currentPage} />;
      }

      if (currentPagePartOf && currentPagePartOf !== subject) {
        return <Resource subject={currentPagePartOf} />;
      }
    }

    const body = () => {
      if (currentPage) {
        return (
          <Resource
            forceRender
            insideCollection
            collectionDisplay={resolvedCollectionDisplay}
            columns={resolvedColumns}
            depth={depth}
            subject={currentPage}
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
              currentPage={currentPage}
              label={ontola.defaultPagination}
              setCurrentPage={setCurrentPage}
            />
          );
      }
    }

    if (tryParseInt(totalItems) === 0 && collectionFilter.length === 0) {
      if (!renderWhenEmptyProp && !renderWhenEmpty) {
        return <Property label={argu.query} setCurrentPage={setCurrentPage} />;
      }
      if (!renderWhenEmptyProp) {
        const createAction = lrs.getResourceProperty(subject, ontola.createAction);
        const actionStatus = createAction
          && lrs.getResourceProperty(createAction, schema.actionStatus);
        if (actionStatus && invalidStatusIds.includes(rdf.id(actionStatus))) {
          return <div data-test="invalid-status" />;
        }
      }
    }

    const header = (!depth || depth === 0) && !hideHeader && (
      <Property
        forceRender
        collectionDisplay={resolvedCollectionDisplay}
        label={ontola.header}
        omniform={omniform}
        setCurrentPage={setCurrentPage}
      />
    );

    const footer = (!depth || depth === 0) && !hideHeader && (
      <Property
        forceRender
        collectionDisplay={resolvedCollectionDisplay}
        label={ontola.footer}
        omniform={omniform}
        setCurrentPage={setCurrentPage}
      />
    );

    return (
      <ResourceBoundary subject={currentPage} wrapperProps={{ className: `Collection Collection__Depth-${depth}` }}>
        {partOf && <Property label={schema.isPartOf} />}
        <Property
          forceRender
          body={body()}
          collectionDisplay={collectionDisplay}
          columns={resolvedColumns}
          currentPage={currentPage}
          footer={footer}
          header={header}
          label={ontola.collectionFrame}
          pagination={pagination}
          setCurrentPage={setCurrentPage}
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
    partOf: PropTypes.bool,
    redirectPagination: PropTypes.bool,
    renderWhenEmpty: PropTypes.bool,
    renderedPage: linkType,
    subject: subjectType,
    totalItems: linkType,
  };

  return Collection;
}
