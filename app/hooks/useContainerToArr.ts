import { Node, SomeTerm } from '@ontologies/core';
import { useDataInvalidation, useLRS } from 'link-redux';
import React from 'react';

import { containerToArr } from '../helpers/data';

export const useContainerToArr = (subject: Node | Node[] | undefined): SomeTerm[] | Promise<void> | undefined  => {
  const lrs = useLRS();
  const lastUpdate = useDataInvalidation(subject);

  return React.useMemo(
    () => subject ? containerToArr(lrs, [], subject) : undefined,
    [subject, lastUpdate],
  );
};
