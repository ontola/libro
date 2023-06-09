import { SomeTerm } from '@ontologies/core';
import {
  LaxNode,
  useFields,
  useIds,
  useResourceLinks,
} from 'link-redux';
import React from 'react';

import { useIRITemplate } from '../../Common/hooks/useIRITemplate';
import ontola from '../../Kernel/ontology/ontola';

const sortDirections = ['asc', 'desc', null];

const sortElementProps = {
  sortDirection: ontola.sortDirection,
  sortKey: ontola.sortKey,
};

export interface SortProps {
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
    sortOptions
      .map((option) => sortDirections.map((direction) => ({
        direction,
        item: option,
        selected: currentSortings.some(([key, dir]) => option === key && dir?.value === direction),
        url: iriTemplate.replace(
          'sort%5B%5D',
          direction ? `${encodeURIComponent(option.value)}=${direction}` : [],
        )?.value,
      })))
      .flat(1)
  ), [sortOptions, currentSortings]);
};
