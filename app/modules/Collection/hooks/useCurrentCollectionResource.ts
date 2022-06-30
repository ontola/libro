import * as as from '@ontologies/as';
import { NamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  useDataFetching,
  useIds,
  useLRS,
} from 'link-redux';
import React from 'react';
import { useNavigate } from 'react-router';

import { resourceHasType } from '../../Common/lib/data';
import { retrievePath } from '../../Common/lib/iris';
import { entityIsLoaded } from '../../Core/lib/data';
import app from '../../Core/ontology/app';
import ontola from '../../Core/ontology/ontola';
import CollectionTypes from '../views/Collection/types';

/**
 * A callback to change the filters, sorting or page of a rendered collection.
 * @param newCollectionResource An `as.Collection` or an `as.CollectionPage`
 */
type SetCollectionResource = (newCollectionResource: NamedNode) => void;

/**
 * The as.Collection currently rendered
 */
type CurrentCollection = SomeNode;

/**
 * A currently rendered as.CollectionPage of the {CurrentCollection}
 */
type CurrentCollectionPage = SomeNode;

type CurrentCollectionResource = [CurrentCollection, CurrentCollectionPage[], SetCollectionResource];

/**
 * @param redirectPagination Let {SetCollectionResource} redirect the entire page,
 *        instead of overriding the collection resource inline when `false`.
 * @param originalCollectionResource The `as.Collection` or an `as.CollectionPage` originally rendered
 */
export const useCurrentCollectionResource = (redirectPagination: boolean, originalCollectionResource: SomeNode):
  CurrentCollectionResource => {
  const lrs = useLRS();
  const navigate = useNavigate();
  const [collectionResource] = useIds(originalCollectionResource, app.collectionResource);

  const redirectPage = React.useCallback((newPage: NamedNode) => (
    navigate(retrievePath(newPage?.value) ?? '#')
  ), [navigate]);

  const setCurrentPage = React.useCallback((newPage: NamedNode) => {
    lrs.actions.app.changePage(originalCollectionResource, newPage);
  }, [originalCollectionResource, lrs]);

  const setCollectionResource = redirectPagination ? redirectPage : setCurrentPage;

  const currentCollectionResource = redirectPagination ? originalCollectionResource : collectionResource ?? originalCollectionResource;
  const [currentCollection, currentCollectionPages] = useCurrentCollectionAndPage(currentCollectionResource);

  useDataFetching([currentCollectionResource]);
  useDataFetching(currentCollectionPages);

  return [currentCollection, currentCollectionPages, setCollectionResource];
};

const useCurrentCollectionAndPage = (currentCollectionResource: SomeNode): [CurrentCollection, CurrentCollectionPage[]] => {
  const lrs = useLRS();
  const isCollection = CollectionTypes.find((type) => resourceHasType(lrs, currentCollectionResource, type));
  const [partOf] = useIds(currentCollectionResource, as.partOf);
  const pages = useIds(currentCollectionResource, ontola.pages);
  const currentCollection = isCollection ? currentCollectionResource : partOf;
  const [collection, setCollection] = React.useState(currentCollection);

  React.useEffect(() => {
    if (currentCollection && entityIsLoaded(lrs, currentCollection)) {
      setCollection(currentCollection);
    }
  }, [currentCollection]);

  if (isCollection) {
    return [collection, pages];
  }

  return [collection, [currentCollectionResource]];
};
