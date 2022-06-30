import { SomeTerm, isNamedNode } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { useDataFetching, useLRS } from 'link-redux';
import React from 'react';

import { isPromise } from '../../Common/lib/typeCheckers';
import { containerToArr, entityIsLoaded } from '../../Core/lib/data';

export interface FieldOptions {
  loading: boolean;
  optionsMap: Map<SomeNode, SomeTerm[]>;
}

const useMultipleFieldOptions = (shIns: SomeNode[]): FieldOptions => {
  const lrs = useLRS();
  const [optionsMap, setOptionsMap] = React.useState<Map<SomeNode, SomeTerm[]>>(new Map([]));
  const [loading, setLoading] = React.useState(true);
  const dataFetchArray = [...shIns, ...Array.from(optionsMap.values()).flat()];
  const timeStamp = useDataFetching(dataFetchArray.filter(isNamedNode));
  const [version, setVersion] = React.useState(0);

  React.useEffect(() => {
    const isLoading = shIns.some((shIn) => !entityIsLoaded(lrs, shIn));

    if (!isLoading) {
      const map = new Map<SomeNode, SomeTerm[]>([]);

      for (const shIn of shIns) {
        const options = containerToArr<SomeTerm>(lrs, [], shIn);

        if (Array.isArray(options)) {
          map.set(shIn, options);
        }

        if (isPromise(options)) {
          options.then(() => {
            setVersion((old) => old + 1);
          });
        }
      }

      setOptionsMap(map);
      setLoading(false);
    }
  }, [timeStamp, shIns, version]);

  return {
    loading,
    optionsMap,
  };
};

export default useMultipleFieldOptions;
