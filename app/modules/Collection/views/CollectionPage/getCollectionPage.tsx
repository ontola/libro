import * as as from '@ontologies/as';
import { NamedNode } from '@ontologies/core';
import { FC, useGlobalIds } from 'link-redux';
import React from 'react';

import ontola from '../../../../ontology/ontola';
import AllWithProperty from '../../../Common/components/AllWithProperty';
import CollectionProvider from '../../components/CollectionProvider';

import { CollectionViewTypes } from './types';

interface CollectionPageProps {
  collectionDisplay?: NamedNode;
  insideCollection: boolean;
  redirectPagination: boolean;
}

export default function getCollectionPage(
  hidePagination: boolean,
  topology: NamedNode | NamedNode[],
): FC<CollectionPageProps> {
  const CollectionPage: FC<CollectionPageProps> = (props) => {
    const [collectionDisplayFromData] = useGlobalIds(ontola.collectionDisplay);

    if (props.insideCollection) {
      return (
        <AllWithProperty
          forceRender
          collectionDisplay={props.collectionDisplay ?? collectionDisplayFromData}
          label={as.items}
        />
      );
    }

    return (
      <CollectionProvider
        renderWhenEmpty
        {...props}
        collectionDisplay={props.collectionDisplay ?? collectionDisplayFromData}
        hidePagination={hidePagination}
      />
    );
  };

  CollectionPage.type = CollectionViewTypes;

  CollectionPage.topology = topology;

  return CollectionPage;
}

