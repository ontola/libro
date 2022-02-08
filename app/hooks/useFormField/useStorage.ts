import React from 'react';

import { storageSet } from '../../helpers/persistence';
import { isJSONLDObject } from '../../helpers/types';

import { InputValue } from './types';

type SaveToStorage = (nextValue: InputValue[]) => void;

export const useStorage = (shouldStore: boolean, storageType: Storage | undefined, storeKey: string): SaveToStorage => {
  const saveToStorage = React.useCallback((nextValue: InputValue[]) => {
    if (shouldStore && storeKey && storageType) {
      storageSet(
        storageType,
        storeKey,
        nextValue.map((val) => isJSONLDObject(val) ? val['@id'] : val),
      );
    }
  }, [storeKey, shouldStore]);

  return saveToStorage;
};
