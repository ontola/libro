import * as as from '@ontologies/as';
import { NamedNode, SomeTerm } from '@ontologies/core';
import { FC, Property } from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';

import { CollectionViewTypes } from './types';

interface CollectionPageProps {
  collectionDisplay: SomeTerm;
  collectionDisplayFromData: SomeTerm;
  insideCollection: boolean;
  redirectPagination: boolean;
  renderPartOf: boolean;
  renderWhenEmpty: boolean;
}

export default function getCollectionPage(
  hidePagination: boolean,
  topology: NamedNode | NamedNode[],
): FC<CollectionPageProps> {
  const CollectionPage: FC<CollectionPageProps> = (props) => {
    if (props.insideCollection) {
      return (
        <Property
          forceRender
          collectionDisplay={props.collectionDisplay || props.collectionDisplayFromData}
          label={as.items}
          renderLimit={Infinity}
        />
      );
    }

    return (
      <Property
        collectionDisplay={props.collectionDisplay || props.collectionDisplayFromData}
        hidePagination={hidePagination}
        label={as.partOf}
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

