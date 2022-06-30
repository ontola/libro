import {
  LinkReduxLRSType,
  useIds,
  useLRS, 
} from 'link-redux';
import React from 'react';
import { IntlShape, useIntl } from 'react-intl';

import ontola from '../../../../Core/ontology/ontola';

import { filterToLabel } from './filterToLabel';
import { FilterValue } from './FilterValue';

type ActiveValues = [activeValues: FilterValue[], hiddenActiveValues: FilterValue[]];

const compareFilters = (lrs: LinkReduxLRSType, intl: IntlShape, a: FilterValue, b: FilterValue) =>
  filterToLabel(lrs, intl, a.key) === filterToLabel(lrs, intl, b.key) && filterToLabel(lrs, intl, a.value) === filterToLabel(lrs, intl, b.value);

export const useActiveValues = (filterValues: FilterValue[]): ActiveValues => {
  const lrs = useLRS();
  const intl = useIntl();
  const activeFilters = useIds(ontola.activeFilters);
  const [acValues, setAcValues] = React.useState<ActiveValues>([[], []]);

  React.useEffect(() => {
    const currentFilterValues = activeFilters.flatMap((currentFilter) => {
      const values = lrs.getResourceProperties(currentFilter, ontola.filterValue);

      return values.map((val) => ({
        key: currentFilter,
        value: val,
      }));
    });

    const splitValues = currentFilterValues.reduce<ActiveValues>(
      ([pass, fail], cv) => {
        const match = filterValues.find((v) => compareFilters(lrs, intl, v, cv));

        return (
          match
            ? [[...pass, match], fail]
            : [pass, [...fail, cv]]
        );
      },
      [[], []],
    );

    setAcValues(splitValues);
  }, [activeFilters, filterValues]);

  return acValues;
};
