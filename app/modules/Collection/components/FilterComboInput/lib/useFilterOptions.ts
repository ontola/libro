import { Node, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { LinkReduxLRSType, useLRS } from 'link-redux';
import React from 'react';

import ontola from '../../../../../ontology/ontola';
import { arraysEqual } from '../../../../Common/lib/data';
import useMultipleFieldOptions from '../../../../Form/hooks/useMultipleFieldOptions';
import { useVisibleFilters } from '../../../hooks/useVisibleFilters';

import { FilterValue } from './FilterValue';

const getFilterValues = (lrs: LinkReduxLRSType, filter: SomeTerm) => lrs.dig(filter as Node, [ontola.filterOptions, ontola.filterValue]);

export const useFilterOptions = (): FilterValue[] => {
  const lrs = useLRS();
  const filterFields = useVisibleFilters();
  const [filterValues, setFilterValues] = React.useState<FilterValue[]>([]);
  const [collectionShIn, setCollectionShIn] = React.useState<SomeNode[]>([]);
  const { loading, optionsMap } = useMultipleFieldOptions(collectionShIn);

  React.useEffect(() => {
    const valueList: FilterValue[] = [];
    const shInList: SomeNode[] = [];

    for (const filter of filterFields) {
      const shIn = lrs.getResourceProperty(filter, ontola.filterOptionsIn) as SomeNode;

      if (shIn) {
        if (!loading) {
          for (const option of optionsMap.get(shIn) ?? []) {
            valueList.push({
              key: filter,
              value: option,
            });
          }
        }

        shInList.push(shIn);
      } else {
        for (const value of getFilterValues(lrs, filter)) {
          valueList.push({
            key: filter,
            value,
          });
        }
      }
    }

    setFilterValues(valueList);

    if (!arraysEqual(shInList, collectionShIn)) {
      setCollectionShIn(shInList);
    }
  }, [filterFields, optionsMap]);

  return filterValues;
};
