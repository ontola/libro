import React from 'react';

import { InputValue, ItemFactory } from './types';

const normalizeValue = (value: InputValue | InputValue[]): InputValue[] => [value].flat(1).filter((v) => v);

interface InputProps {
  value: InputValue[];
}

export const useInputValues = (
  input: InputProps,
  alwaysVisible: boolean,
  minCount: number | undefined,
  newItem: ItemFactory,
): InputValue[] => React.useMemo(() => {
  const currentValue = normalizeValue(input.value);

  if (currentValue.length === 0) {
    const showEmptyField = alwaysVisible || (minCount && minCount > 0);

    if (showEmptyField) {
      return [newItem()];
    }
  }

  return currentValue;
}, [input.value, alwaysVisible, minCount, newItem]);
