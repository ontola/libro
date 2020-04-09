import as from '@ontologies/as';
import {
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import ontola from '../../ontology/ontola';
import { allTopologiesExcept } from '../../topologies';
import { alertDialogTopology } from '../../topologies/Dialog';
import { inlineTopology } from '../../topologies/Inline';
import { fullResourceTopology } from '../../topologies/FullResource';
import { pageTopology } from '../../topologies/Page';

import CollectionPageInline from './CollectionPageInline';
import Items from './properties/items';
import Name from './properties/name';
import Views from './properties/views';
import { CollectionViewTypes } from './types';

function getCollectionPage({
  hidePagination = true,
  topology = [],
} = {}) {
  const CollectionPage = (props) => {
    if (props.insideCollection) {
      return (
        <Property
          forceRender
          collectionDisplay={props.collectionDisplay || props.collectionDisplayFromData}
          columns={props.columns}
          depth={props.depth}
          label={as.items}
          renderLimit={Infinity}
        />
      );
    }

    return (
      <Property
        renderedByPage
        collectionDisplay={props.collectionDisplay || props.collectionDisplayFromData}
        hidePagination={hidePagination}
        label={as.partOf}
        renderedPage={props.subject}
        renderWhenEmpty={props.renderWhenEmpty}
      />
    );
  };

  CollectionPage.type = CollectionViewTypes;

  CollectionPage.topology = topology;

  CollectionPage.hocs = [withRouter];

  CollectionPage.mapDataToProps = {
    collectionDisplayFromData: ontola.collectionDisplay,
    partOf: as.partOf,
  };

  CollectionPage.propTypes = {
    collectionDisplay: linkType,
    collectionDisplayFromData: linkType,
    columns: linkType,
    depth: PropTypes.number,
    insideCollection: PropTypes.bool,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    renderWhenEmpty: PropTypes.bool,
    subject: subjectType,
  };

  return CollectionPage;
}

const DefaultCollectionPage = getCollectionPage({
  topology: allTopologiesExcept(
    alertDialogTopology,
    fullResourceTopology,
    inlineTopology,
    pageTopology
  ),
});

const PageCollectionPage = getCollectionPage({
  hidePagination: false,
  topology: fullResourceTopology,
});

const AlertPage = getCollectionPage({
  hidePagination: false,
  topology: alertDialogTopology,
});

export default [
  register(AlertPage),
  register(DefaultCollectionPage),
  register(PageCollectionPage),
  CollectionPageInline,
  ...Items,
  Name,
  ...Views,
];
