import * as as from '@ontologies/as';
import { NamedNode, SomeTerm } from '@ontologies/core';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { allTopologiesExcept } from '../../topologies';
import { alertDialogTopology } from '../../topologies/Dialog';
import { inlineTopology } from '../../topologies/Inline';
import { fullResourceTopology } from '../../topologies/FullResource';
import { pageTopology } from '../../topologies/Page';

import CollectionPageInline from './CollectionPageInline';
import Empty from './properties/empty';
import Items from './properties/items';
import Name from './properties/name';
import Views from './properties/views';
import { CollectionViewTypes } from './types';

interface CollectionPageProps {
  collectionDisplay: SomeTerm;
  collectionDisplayFromData: SomeTerm;
  columns: NamedNode[];
  depth: number;
  insideCollection: boolean;
  maxColumns: number;
  originalCollectionResource: SomeTerm;
  redirectPagination: boolean;
  renderPartOf: boolean;
  renderWhenEmpty: boolean;
  view: SomeTerm;
}

function getCollectionPage({
  hidePagination = true,
  topology = [],
}: {
  hidePagination: boolean,
  topology: NamedNode | NamedNode[],
}) {
  const CollectionPage: FC<CollectionPageProps> = (props) => {
    if (props.insideCollection) {
      return (
        <Property
          forceRender
          collectionDisplay={props.collectionDisplay || props.collectionDisplayFromData}
          columns={props.columns}
          depth={props.depth}
          label={as.items}
          maxColumns={props.maxColumns}
          renderLimit={Infinity}
          view={props.view}
        />
      );
    }

    return (
      <Property
        collectionDisplay={props.collectionDisplay || props.collectionDisplayFromData}
        hidePagination={hidePagination}
        label={as.partOf}
        originalCollectionResource={props.originalCollectionResource || props.subject}
        redirectPagination={props.redirectPagination}
        renderPartOf={props.renderPartOf}
        renderWhenEmpty={props.renderWhenEmpty}
        renderedPage={props.subject}
      />
    );
  };

  CollectionPage.type = CollectionViewTypes;

  CollectionPage.topology = topology;

  CollectionPage.mapDataToProps = {
    collectionDisplayFromData: ontola.collectionDisplay,
    partOf: as.partOf,
  };

  return CollectionPage;
}

const DefaultCollectionPage = getCollectionPage({
  hidePagination: true,
  topology: allTopologiesExcept(
    alertDialogTopology,
    fullResourceTopology,
    inlineTopology,
    pageTopology,
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
  Empty,
  ...Items,
  Name,
  ...Views,
];
