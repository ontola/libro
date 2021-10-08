import rdf, {
  NamedNode,
  isNamedNode,
  isNode,
} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  useDataFetching,
  useDataInvalidation,
  useDates,
  useIds,
  useLRS,
} from 'link-redux';
import React from 'react';

import { entityIsLoaded } from '../../helpers/data';
import ontola from '../../ontology/ontola';

const freshCollectionIRI = (collection: SomeNode, collectedAt?: Date) => {
  if (!isNamedNode(collection) || !collectedAt) {
    return undefined;
  }

  const iri = new URL(collection.value);
  iri.searchParams.set('collected_at', collectedAt.toString());

  return rdf.namedNode(iri.toString());
};

type CollectionTriple = [SomeNode, SomeNode, Date];
const COLLECTION = 0;
const BASE_COLLECTION = 1;
const LAST_ACTIVITY_AT = 2;

/**
 * Automatically refreshes the collections when the lastActivityAt of its baseCollection changes.
 * @returns {boolean} Whether one of the collections is currently refreshing
 */
const useCollectionRefresh = (collectionsRaw: SomeNode | SomeNode[]): boolean => {
  const lrs = useLRS();
  const collections = React.useMemo<SomeNode[]>(() => (
    Array.isArray(collectionsRaw) ? collectionsRaw : [collectionsRaw]
  ), [collectionsRaw]);
  const baseCollectionsArray = useIds(collections, ontola.baseCollection);
  const baseCollections = baseCollectionsArray.map((values) => values[0]);
  const lastActivitiesAtArray = useDates(baseCollections, ontola.lastActivityAt);
  const lastActivitiesAt = lastActivitiesAtArray.map((values) => values[0]);

  const [refreshing, setRefreshing] = React.useState(false);

  const collectionTriples = React.useMemo<CollectionTriple[]>(() => (
    collections.map((collection, index) => (
      [collection, baseCollections[index], lastActivitiesAt[index]] as CollectionTriple
    )).filter((triple) => isNode(triple[COLLECTION]) && isNode(triple[BASE_COLLECTION]))
  ), [collections, baseCollectionsArray, lastActivitiesAtArray]);
  const freshCollections = React.useMemo<NamedNode[]>(() => (
    collectionTriples.map((triple) => (
      freshCollectionIRI(triple[COLLECTION], triple[LAST_ACTIVITY_AT])
    ))
  ), [lastActivitiesAtArray]);

  const baseTimeStamp = useDataInvalidation(baseCollections);
  const collectionTimeStamp = useDataFetching(collectionTriples.map((triple) => triple[COLLECTION]));
  const freshCollectionTimestamp = useDataFetching(freshCollections);

  React.useEffect(() => {
    const freshCollection = freshCollections.findIndex((collection) => collection && !entityIsLoaded(lrs, collection));

    if (freshCollection === -1) {
      setRefreshing(false);
    } else {
      setRefreshing(true);
    }
  }, [freshCollections, baseTimeStamp, collectionTimeStamp, freshCollectionTimestamp]);

  return refreshing;
};

export default useCollectionRefresh;
