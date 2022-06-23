import { SomeTerm } from '@ontologies/core';
import React from 'react';

import { serializeForStorage } from '../../Common/lib/persistence';

const fieldName = (key: string): string => key.split('.').slice(-1).pop() ?? key;

const useMemoryStore = (initialValues: Record<string, SomeTerm[]>): Partial<Storage> => React.useMemo<Partial<Storage>>(() => {

  const store: Partial<Storage> = {
    values: Object.keys(initialValues).reduce<Record<string, string>>((acc, key) => ({
      ...acc,
      [btoa(key)]: serializeForStorage(initialValues[key]),
    }), {}),
  };

  store.getItem = (key) => store.values[fieldName(key)];

  store.setItem = (key, value) => {
    store.values[fieldName(key)] = value;
  };

  return store;
}, []);

export default useMemoryStore;
