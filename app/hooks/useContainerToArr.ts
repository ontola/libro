import { SomeNode } from 'link-lib';
import { useDataInvalidation, useLRS } from 'link-redux';
import React from 'react';

import { containerToArr } from '../helpers/data';

export function useContainerToArr(subject: SomeNode) {
  const lrs = useLRS();
  const lastUpdate = useDataInvalidation(subject);

  return React.useMemo(
    () => subject ? containerToArr(lrs, [], subject) : undefined,
    [subject, lastUpdate],
  );
}
