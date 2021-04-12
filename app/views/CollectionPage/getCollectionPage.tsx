import * as as from '@ontologies/as';
import { NamedNode } from '@ontologies/core';
import { FC, Property } from 'link-redux';
import React from 'react';

import CollectionProvider from '../../components/Collection/CollectionProvider';
import ontola from '../../ontology/ontola';

import { CollectionViewTypes } from './types';

interface CollectionPageProps {
  collectionDisplay?: NamedNode;
  collectionDisplayFromData?: NamedNode;
  insideCollection: boolean;
  redirectPagination: boolean;
  renderPartOf: boolean;
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
      <CollectionProvider
        renderWhenEmpty
        {...props}
        collectionDisplay={props.collectionDisplay || props.collectionDisplayFromData}
        hidePagination={hidePagination}
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
