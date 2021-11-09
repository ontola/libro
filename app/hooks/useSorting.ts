import { SomeTerm } from '@ontologies/core';
import {
  LaxNode,
  useFields,
  useIds,
  useResourceLinks,
} from 'link-redux';
import React from 'react';

import ontola from '../ontology/ontola';

import { useIRITemplate } from './useIRITemplate';

const sortDirectionsAsc = ['asc', 'desc', null];
const sortDirectionsDesc = ['desc', 'asc', null];

const sortElementProps = {
  sortDirection: ontola.sortDirection,
  sortKey: ontola.sortKey,
};

export interface SortProps  {
    direction: string | null;
    item: SomeTerm;
    selected: boolean;
    url?: string;
}

export const useSorting = (subject: LaxNode): SortProps[] => {
  const iriTemplate = useIRITemplate(subject);
  const collectionSorting = useIds(subject, ontola.collectionSorting);
  const sortOptions = useFields(subject, ontola.sortOptions);
  const currentSortingsRaw = useResourceLinks(collectionSorting, sortElementProps);
  const currentSortings = React.useMemo(() => (
    currentSortingsRaw.map(({ sortKey, sortDirection }) => [sortKey, sortDirection])
  ), [currentSortingsRaw]);

  return React.useMemo(() => (
    sortOptions.map((option) => {
      const [_, activeDirection] = currentSortings.find(([key]) => option === key) || [];
      const descActive = activeDirection?.value === 'desc';

      return (descActive ? sortDirectionsDesc : sortDirectionsAsc).map((direction) => ({
        direction,
        item: option,
        selected: activeDirection ? activeDirection?.value === direction : false,
        url: iriTemplate.replace(
          'sort%5B%5D',
          direction ? `${encodeURIComponent(option.value)}=${direction}` : [],
        )?.value,
      }));
    }).flat(1)
  ), [sortOptions, currentSortings]);
};
