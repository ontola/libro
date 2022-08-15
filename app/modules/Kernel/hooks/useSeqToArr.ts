import {
  SomeTerm,
  Term,
  isNamedNode,
  isNode,
} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useDataFetching, useLRS } from 'link-redux';
import React from 'react';

import { entityIsLoaded, seqToArr } from '../lib/data';

import { ResolvedArray } from './useContainerToArr';

export function useSeqToArr<I extends Term = SomeTerm>(subject?: SomeNode | I[]): ResolvedArray<I> {
  const lrs = useLRS();
  const lastUpdate = useDataFetching(isNode(subject) ? subject : []);

  return React.useMemo(() => {
    if (!subject) {
      return [[], false];
    }

    if (isNamedNode(subject) && !entityIsLoaded(lrs, subject)) {
      return [[], true];
    }

    const result = seqToArr<I>(lrs, [], subject);

    return [result, false];
  }, [subject, lastUpdate]);
}
