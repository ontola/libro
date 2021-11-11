import rdf from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { LaxIdentifier, LaxNode } from 'link-redux';
import React from 'react';
import { useField } from 'react-final-form';

import { InputValue } from '../../../../hooks/useFormField';

const AUTO_FORWARD_TIMEOUT_MS = 1000;
const NON_FORWARD_FIELD_NAME = 'NON FORWARD FIELD';

const findKey = (field: LaxIdentifier, map: Map<string, SomeNode>): string | undefined => {
  for (const [key, value] of map.entries()) {
    if (value.value === field?.value) {
      return key;
    }
  }

  return;
};

const valueChanged = (a: InputValue[], b: InputValue[]): boolean =>
  a.some((v, index) => v.value !== b[index].value);

const sanitizeValue = (value: InputValue[]): InputValue[] =>
  value?.length > 0 ? [value].flat(1) : [rdf.literal('')];

export const useAutoForward = (
  activeField: LaxNode,
  hashMap: Map<string, SomeNode>,
  isAutoForwardField: boolean,
  activateNextField: () => void,
): void => {

  const fieldKey = React.useMemo(() => {
    if (!isAutoForwardField) {
      return;
    }

    return findKey(activeField, hashMap);
  }, [activeField, hashMap, isAutoForwardField]);

  const { input, meta } = useField(fieldKey ?? NON_FORWARD_FIELD_NAME, {
    subscription: {
      valid: true,
      value: true,
    },
  });

  const { value }: { value: InputValue[] } = input;
  const { valid }: { valid?: boolean } = meta;

  const [lastValue, setLastValue] = React.useState<[string | undefined, InputValue[]]>([fieldKey ?? '', sanitizeValue(value)]);

  React.useEffect(() => {
    const flattenedValue = sanitizeValue(value);

    if (!fieldKey) {

      return;
    }

    if (fieldKey !== lastValue[0]) {
      setLastValue([fieldKey, flattenedValue]);

      return;
    }

    if (valid && valueChanged(lastValue[1], flattenedValue)) {
      setTimeout(() => {
        activateNextField();
      }, AUTO_FORWARD_TIMEOUT_MS);
    }

    setLastValue([fieldKey, flattenedValue]);
  }, [value]);
};
