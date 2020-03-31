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
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Heading from '../../components/Heading';
import LinkDuo from '../../components/LinkDuo';
import ResourceBoundary from '../../components/ResourceBoundary';
import { listToArr } from '../../helpers/data';
import { tryParseInt } from '../../helpers/numbers';
import ontola from '../../ontology/ontola';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { CollectionTypes } from './types';

export default function getCollection({
  omniform = false,
  redirect = false,
  renderWhenEmpty = true,
  topology = [],
} = {}) {
  const Collection = ({
    clickToOpen,
    collectionDisplay,
    collectionDisplayFromData,
    collectionType,
    columns,
    currentPage: currentPageProp,
    depth,
    hideHeader,
    hidePagination,
    lrs,
    partOf,
    redirectPagination,
    renderWhenEmpty: renderWhenEmptyProp,
    subject,
    totalItems,
  }) => {
    const [currentPage, onPageChange] = React.useState(currentPageProp);
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
      const type = lrs.getResourceProperty(rdf.namedNode(currentPage), rdfx.type);

      if (CollectionTypes.includes(type)) {
        return <Resource subject={rdf.namedNode(currentPage)} />;
      }

      const pagePartOf = lrs.getResourceProperty(rdf.namedNode(currentPage), schema.isPartOf);
      if (pagePartOf && pagePartOf !== subject) {
        return <Resource subject={pagePartOf} />;
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
            redirectPagination={redirect || redirectPagination}
            subject={rdf.namedNode(currentPage)}
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
              currentPage={currentPage}
              label={ontola.infinitePagination}
              redirectPagination={redirectPagination}
            />
          );
          break;
        default:
          pagination = (
            <Property
              forceRender
              currentPage={currentPage}
              label={ontola.defaultPagination}
              redirectPagination={redirectPagination}
              onPageChange={onPageChange}
            />
          );
      }
    }

    if (tryParseInt(totalItems) === 0) {
      if (!renderWhenEmptyProp && !renderWhenEmpty) {
        return <div data-test="empty" />;
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
        onPageChange={onPageChange}
      />
    );

    return (
      <ResourceBoundary wrapperProps={{ className: `Collection Collection__Depth-${depth}` }}>
        {partOf && <Property label={schema.isPartOf} />}
        <Property
          forceRender
          body={body()}
          collectionDisplay={collectionDisplay}
          columns={resolvedColumns}
          header={header}
          label={ontola.collectionFrame}
          pagination={pagination}
          onPageChange={onPageChange}
        />
      </ResourceBoundary>
    );
  };

  Collection.type = CollectionTypes;

  Collection.topology = topology;

  Collection.mapDataToProps = {
    collectionDisplayFromData: ontola.collectionDisplay,
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
    collectionType: linkType,
    columns: linkType,
    currentPage: PropTypes.string,
    depth: PropTypes.number,
    hideHeader: PropTypes.bool,
    hidePagination: PropTypes.bool,
    lrs: lrsType,
    partOf: PropTypes.bool,
    redirectPagination: PropTypes.bool,
    renderWhenEmpty: PropTypes.bool,
    subject: subjectType,
    totalItems: linkType,
  };

  return Collection;
}
