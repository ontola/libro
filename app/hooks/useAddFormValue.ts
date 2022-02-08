import rdf from '@ontologies/core';
import React from 'react';

import {
  JSONLDObject,
  clearRemoval,
  destroyFieldName,
} from '../helpers/forms';
import { isJSONLDObject } from '../helpers/types';

import {
  InputValue,
  ItemFactory,
  OnInputChange,
} from './useFormField';

type AddItem = () => void;

const isDestroyedValue = (value: JSONLDObject) => value[destroyFieldName] === rdf.literal(true);

/**
 * Returns a callback to add values to a form input. If there are any deleted values it will restore one instead.
 */
const useAddFormValue = (values: InputValue[], onChange: OnInputChange, itemFactory: ItemFactory): AddItem => (
  React.useCallback(() => {
    const newValues = values?.slice() ?? [];

    const removedIndex = newValues.findIndex((newValue: InputValue) => (
      isJSONLDObject(newValue) && isDestroyedValue(newValue)
    ));

    if (removedIndex >= 0) {
      newValues[removedIndex] = clearRemoval(newValues[removedIndex] as JSONLDObject);
    } else {
      newValues.push(itemFactory());
    }

    onChange(newValues);
  }, [values, onChange, itemFactory])
);

export default useAddFormValue;
