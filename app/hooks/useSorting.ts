import { SomeTerm, isNode } from '@ontologies/core';
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

export interface SortOptions  {
    direction: string | null;
    item: SomeTerm;
    selected: boolean;
    url?: string;
}

export const useSorting = (): SortOptions[] => {
  const { subject } = useLinkRenderContext();
  const iriTemplate = useIRITemplate(subject);
  const collectionSorting = useProperty(ontola.collectionSorting);
  const sortOptions = useProperty(ontola.sortOptions);
  const currentSortings = useResourceLinks(collectionSorting.filter(isNode), sortElementProps)
    .map(({ sortKey, sortDirection }) => [sortKey, sortDirection]);

  return sortOptions
    .map((option) => sortDirections.map((direction) => ({
      direction,
      item: option,
      selected: currentSortings.some(([key, dir]) => option === key && dir?.value === direction),
      url: iriTemplate.replace(
        'sort%5B%5D',
        direction ? `${encodeURIComponent(option.value)}=${direction}` : [],
      )?.value,
    })))
    .flat(1);
};
