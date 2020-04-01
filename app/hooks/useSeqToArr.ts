import { SomeNode } from 'link-lib';
import { useDataInvalidation, useLRS } from 'link-redux';
import React from 'react';

import { seqToArr } from '../helpers/data';

export function useSeqToArr(subject: SomeNode) {
  const lrs = useLRS();
  const lastUpdate = useDataInvalidation(subject);

  return React.useMemo(() => seqToArr(lrs, [], subject), [subject, lastUpdate]);
}
