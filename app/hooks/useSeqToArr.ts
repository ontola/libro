import { SomeTerm, Term } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useDataInvalidation, useLRS } from 'link-redux';
import React from 'react';

import { seqToArr } from '../helpers/data';

export function useSeqToArr<I extends Term = SomeTerm>(subject: SomeNode): I[] | undefined {
  const lrs = useLRS();
  const lastUpdate = useDataInvalidation(subject);

  return React.useMemo(
    () => subject ? seqToArr<I>(lrs, [], subject) : undefined,
    [subject, lastUpdate],
  );
}
