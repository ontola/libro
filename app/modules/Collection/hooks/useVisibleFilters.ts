import { SomeNode } from 'link-lib/dist-types/types';
import {
  array,
  useBooleans,
  useIds,
} from 'link-redux';
import React from 'react';

import ontola from '../../Kernel/ontology/ontola';

export const useVisibleFilters = (): SomeNode[] => {
  const fields = useIds(array(ontola.filterFields));
  const visibility = useBooleans(fields, ontola.visible);

  return React.useMemo(
    () => fields.filter((_, index) => visibility[index]?.[0]),
    [fields],
  );
};

