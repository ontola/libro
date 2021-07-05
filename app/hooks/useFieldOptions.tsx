import rdf, {
  SomeTerm,
  isNamedNode,
} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  useDataFetching,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';

import { arraysEqual } from '../helpers/data';

import { useContainerToArr } from './useContainerToArr';

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

  useDataInvalidation([shIn, ...options].filter(isNamedNode));
  useDataFetching([shIn, ...options].filter(isNamedNode));
  const [optionsArray, optionsLoading] = useContainerToArr(shIn);

  React.useEffect(() => {
    if (!optionsLoading) {
      setLoading(false);
      if (!arraysEqual(optionsArray, options)) {
        setOptions(optionsArray);
      }
    } else {
      setLoading(!!shIn);
    }
  }, [loading, optionsLoading, options, shIn, shIn && lrs.store.changeTimestamps[rdf.id(shIn)]]);

  return {
    loading,
    options,
  };
};

export default useFieldOptions;
