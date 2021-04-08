import {
  Node,
  SomeTerm,
  Term,
  isNamedNode,
} from '@ontologies/core';
import { useDataInvalidation, useLRS } from 'link-redux';
import React from 'react';

import { containerToArr } from '../helpers/data';

export const useContainerToArr = <I extends Term = SomeTerm>(subject: Node | I[] | undefined): I[] | Promise<void> | undefined  => {
  const lrs = useLRS();
  const lastUpdate = useDataInvalidation(isNamedNode(subject) ? subject : undefined);

  return React.useMemo(
    () => subject ? containerToArr<I>(lrs, [], subject) : undefined,
    [subject, lastUpdate],
  );
};
