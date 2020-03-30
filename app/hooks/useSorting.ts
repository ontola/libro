import { isNode } from '@ontologies/core';
import {
  useLinkRenderContext,
  useProperty,
  useResourceLinks,
} from 'link-redux';

import ontola from '../ontology/ontola';

import { useIRITemplate } from './useIRITemplate';

const sortDirections = ['asc', 'desc', null];

const sortElementProps = {
  sortDirection: ontola.sortDirection,
  sortKey: ontola.sortKey,
};

export const useSorting = () => {
  const { subject } = useLinkRenderContext();
  const { iriSetParam } = useIRITemplate(subject);
  const collectionSorting = useProperty(ontola.collectionSorting);
  const sortOptions = useProperty(ontola.sortOptions);
  const currentSortings = useResourceLinks(collectionSorting.filter(isNode), sortElementProps)
    .map(({ sortKey, sortDirection }) => [sortKey, sortDirection]);

  return sortOptions
    .map((option) => sortDirections.map((direction) => ({
      direction,
      item: option,
      selected: currentSortings.some(([key, dir]) => option === key && dir?.value === direction),
      url: iriSetParam('sort%5B%5D', direction && `${encodeURIComponent(option.value)}=${direction}`)?.value,
    })))
    .flat(1);
};
