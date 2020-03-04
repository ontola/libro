import as from '@ontologies/as';
import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  linkedPropType,
  lrsType,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ResourceBoundary from '../../components/ResourceBoundary';
import { listToArr } from '../../helpers/data';
import { tryParseInt } from '../../helpers/numbers';
import ontola from '../../ontology/ontola';
import { gotoPage } from '../../state/pagination/actions';
import { getPage } from '../../state/pagination/selectors';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

import { CollectionTypes } from './types';

export default function getCollection({
  omniform = false,
  redirect = false,
  renderWhenEmpty = true,
  topology = [],
} = {}) {
  class Collection extends React.Component {
    static type = CollectionTypes;

    static topology = topology;

    static mapDataToProps = {
      collectionDisplayFromData: ontola.collectionDisplay,
      collectionType: ontola.collectionType,
      columns: ontola.columns,
      defaultType: ontola.defaultType,
      pages: {
        label: ontola.pages,
        limit: Infinity,
      },
      totalItems: as.totalItems,
    };

    static hocs = [
      connect(
        (state, {
          currentPage,
          renderWhenEmpty: rwe,
          subject,
        }) => ({
          currentPage: getPage(state, subject.value) || currentPage,
          renderWhenEmpty: rwe || renderWhenEmpty,
        }),
        (dispatch, { subject }) => ({
          onPageChange: (url) => dispatch(gotoPage(subject.value, url)),
        })
      ),
    ];

    static propTypes = {
      collectionDisplay: linkType,
      collectionDisplayFromData: linkType,
      collectionType: linkType,
      columns: linkType,
      currentPage: PropTypes.string,
      depth: PropTypes.number,
      hideHeader: PropTypes.bool,
      hidePagination: PropTypes.bool,
      linkVersion: PropTypes.number,
      linkedProp: linkedPropType,
      lrs: lrsType,
      onPageChange: PropTypes.func,
      pages: linkType,
      partOf: PropTypes.bool,
      redirectPagination: PropTypes.bool,
      renderWhenEmpty: PropTypes.bool,
      subject: subjectType,
      totalItems: linkType,
    };

    shouldComponentUpdate(nextProps, nextState) {
      return this.props.linkedProp !== nextProps.linkedProp
        || this.props.currentPage !== nextProps.currentPage
        || this.props.linkVersion !== nextProps.linkVersion
        || this.props.subject !== nextProps.subject
        || this.props.pages !== nextProps.pages
        || this.state?.opened !== nextState?.opened;
    }

    body(columns) {
      if (this.props.currentPage) {
        return (
          <Resource
            forceRender
            insideCollection
            collectionDisplay={this.props.collectionDisplay || this.props.collectionDisplayFromData}
            columns={columns}
            depth={this.props.depth}
            redirectPagination={redirect || this.props.redirectPagination}
            subject={rdf.namedNode(this.props.currentPage)}
          />
        );
      }

      return (
        <Property
          forceRender
          insideCollection
          collectionDisplay={this.props.collectionDisplay || this.props.collectionDisplayFromData}
          columns={columns}
          depth={this.props.depth}
          label={ontola.pages}
        />
      );
    }

    pagination() {
      if (this.props.hidePagination) {
        return <Property label={as.totalItems} />;
      }

      switch (rdf.id(this.props.collectionType)) {
        case rdf.id(ontola['collectionType/infinite']):
          return (
            <Property
              forceRender
              currentPage={this.props.currentPage}
              label={ontola.infinitePagination}
              redirectPagination={this.props.redirectPagination}
            />
          );
        default:
          return (
            <Property
              forceRender
              currentPage={this.props.currentPage}
              label={ontola.defaultPagination}
              redirectPagination={this.props.redirectPagination}
              onPageChange={this.props.onPageChange}
            />
          );
      }
    }

    renderCollection() {
      const {
        columns,
        depth,
        hideHeader,
        lrs,
        partOf,
        subject,
        totalItems,
      } = this.props;
      if (tryParseInt(totalItems) === 0) {
        if (!this.props.renderWhenEmpty) {
          return null;
        }
        const createAction = lrs.getResourceProperty(subject, ontola.createAction);
        const actionStatus = createAction
          && lrs.getResourceProperty(createAction, schema.actionStatus);
        if (actionStatus && invalidStatusIds.includes(rdf.id(actionStatus))) {
          return null;
        }
      }

      const collectionDisplay = this.props.collectionDisplay
        || this.props.collectionDisplayFromData;
      const resolvedColumns = columns ? listToArr(lrs, [], columns) : undefined;
      const header = (!depth || depth === 0) && !hideHeader && (
        <Property
          forceRender
          collectionDisplay={collectionDisplay}
          label={ontola.header}
          omniform={omniform}
        />
      );

      return (
        <ResourceBoundary wrapperProps={{ className: `Collection Collection__Depth-${depth}` }}>
          {partOf && <Property label={schema.isPartOf} />}
          <Property
            forceRender
            body={this.body(resolvedColumns)}
            collectionDisplay={collectionDisplay}
            columns={resolvedColumns}
            header={header}
            label={ontola.collectionFrame}
            pagination={this.pagination()}
          />
        </ResourceBoundary>
      );
    }

    render() {
      return this.renderCollection();
    }
  }

  return Collection;
}
