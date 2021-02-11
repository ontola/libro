import rdf, {
  SomeTerm,
  isNamedNode,
  isNode,
} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import {
  useDataFetching,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';

import {
  arraysEqual,
  containerToArr,
  entityIsLoaded,
} from '../helpers/data';

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
  const loaded = isNode(shIn) && entityIsLoaded(lrs, shIn);

  React.useEffect(() => {
    let optionsArray;
    if (Array.isArray(shIn)) {
      optionsArray = shIn;
    } else if (loaded && shIn) {
      optionsArray = containerToArr(lrs, [], shIn);
    }

    if (Array.isArray(optionsArray)) {
      setLoading(false);
      if (!arraysEqual(optionsArray, options)) {
        setOptions(optionsArray);
      }
    } else {
      setLoading(!!shIn);
    }
  }, [loading, loaded, shIn, shIn && lrs.store.changeTimestamps[rdf.id(shIn)]]);

  return {
    loading,
    options,
  };
};

export default useFieldOptions;
