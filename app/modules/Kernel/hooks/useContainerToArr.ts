import {
  SomeTerm,
  Term,
  isNode,
} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useDataFetching, useLRS } from 'link-redux';
import React from 'react';

import { isPromise } from '../lib/typeCheckers';
import { containerToArr } from '../lib/data';

export type ResolvedArray<I> = [array: I[], loading: boolean];

export const useContainerToArr = <I extends Term = SomeTerm>(subject?: SomeNode | I[]): ResolvedArray<I> => {
  const lrs = useLRS();
  const lastUpdate = useDataFetching(isNode(subject) ? subject : []);
  const [version, setVersion] = React.useState(0);

  return React.useMemo(() => {
    if (!subject) {
      return [[], false];
    }

    const result = containerToArr<I>(lrs, [], subject);

    if (Array.isArray(result)) {
      return [result, false];
    }

    if (isPromise(result)) {
      result.then(() => {
        setVersion((old) => old + 1);
      });
    }

    return [[], true];
  }, [subject, lastUpdate, version]);
};
