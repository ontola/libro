import { SomeTerm, isNamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useDataFetching, useLRS } from 'link-redux';
import React from 'react';

import { useContainerToArr } from '../../Core/hooks/useContainerToArr';
import { arraysEqual } from '../../Common/lib/data';

export interface FieldOptions {
  loading: boolean;
  options: SomeTerm[];
}

const useFieldOptions = (shIn: SomeNode | undefined): FieldOptions => {
  const lrs = useLRS();
  const [options, setOptions] = React.useState<SomeTerm[]>(([]));
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setOptions([]);
    setLoading(true);
  }, [shIn]);

  useDataFetching([shIn, ...options].filter(isNamedNode));
  const [optionsArray, optionsLoading] = useContainerToArr(shIn);
  const shInUpdate = shIn && lrs.store.getInternalStore().store.getStatus(shIn.value).lastUpdate;

  React.useEffect(() => {
    if (!optionsLoading) {
      setLoading(false);

      if (!arraysEqual(optionsArray, options)) {
        setOptions(optionsArray);
      }
    } else {
      setLoading(!!shIn);
    }
  }, [loading, optionsLoading, options, shIn, shInUpdate]);

  return {
    loading,
    options,
  };
};

export default useFieldOptions;
