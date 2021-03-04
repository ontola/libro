import { SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useDataInvalidation, useLRS } from 'link-redux';
import React from 'react';

import { seqToArr } from '../helpers/data';

export function useSeqToArr(subject: SomeNode): SomeTerm[] | undefined {
  const lrs = useLRS();
  const lastUpdate = useDataInvalidation(subject);

  return React.useMemo(
    () => subject ? seqToArr(lrs, [], subject) : undefined,
    [subject, lastUpdate],
  );
}
