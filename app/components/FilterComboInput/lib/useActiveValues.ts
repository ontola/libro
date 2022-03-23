import { SomeNode } from 'link-lib/dist-types/types';
import { LinkReduxLRSType, useLRS } from 'link-redux';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';

import ontola from '../../../ontology/ontola';

import { filterToLabel } from './filterToLabel';
import { FilterValue } from './FilterValue';

const compareFilters = (lrs: LinkReduxLRSType, intl: IntlShape, a: FilterValue, b: FilterValue) =>
  filterToLabel(lrs, intl, a.key) === filterToLabel(lrs, intl, b.key) && filterToLabel(lrs, intl, a.value) === filterToLabel(lrs, intl, b.value);

export const useActiveValues = (activeFilters: SomeNode[], filterValues: FilterValue[]): FilterValue[] => {
  const lrs = useLRS();
  const intl = useIntl();
  const [acValues, setAcValues] = React.useState<FilterValue[]>([]);

  React.useEffect(() => {
    const currentFilterValues = activeFilters.flatMap((currentFilter) => {
      const values = lrs.getResourceProperties(currentFilter, ontola.filterValue);

      return values.map((val) => ({
        key: currentFilter,
        value: val,
      }));
    });

    const values = filterValues.filter((v) => currentFilterValues.some((cv) => compareFilters(lrs, intl, v, cv)));
    setAcValues(values);
  }, [activeFilters, filterValues]);

  return acValues;
};
