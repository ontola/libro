import { SomeTerm, isNamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useDataFetching, useLRS } from 'link-redux';
import React from 'react';

import { arraysEqual } from '../../Common/lib/data';
import { useContainerToArr } from '../../Kernel/hooks/useContainerToArr';
import libro from '../../Kernel/ontology/libro';

export interface FieldOptions {
  loading: boolean;
  nullable: boolean;
  options: SomeTerm[];
}

const useFieldOptions = (shIn: SomeNode | undefined): FieldOptions => {
  const lrs = useLRS();
  const [options, setOptions] = React.useState<SomeTerm[]>(([]));
  const [loading, setLoading] = React.useState(true);
  const [nullable, setNullable] = React.useState(false);
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
      let selectableOptions;

      if (optionsArray.includes(libro.null)) {
        setNullable(true);
        selectableOptions = optionsArray.filter((option) => option !== libro.null );
      } else {
        setNullable(false);
        selectableOptions = optionsArray;
      }

      if (!arraysEqual(selectableOptions, options)) {
        setOptions(selectableOptions);
      }
    } else {
      setLoading(!!shIn);
    }
  }, [loading, optionsLoading, options, shIn, shInUpdate]);

  return {
    loading,
    nullable,
    options,
  };
};

export default useFieldOptions;
