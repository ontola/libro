import rdf from '@ontologies/core';
import React from 'react';

import {
  InputValue,
  ItemFactory,
  OnInputChange,
} from '../components/FormField/FormFieldTypes';
import {
  JSONLDObject,
  clearRemoval,
  destroyFieldName,
} from '../helpers/forms';
import { isJSONLDObject } from '../helpers/types';

type AddItem = () => void;

/**
 * Returns a callback to add values to a form input. It restores deleted values when available first.
 */
const useAddFormValue = (values: InputValue[], onChange: OnInputChange, itemFactory: ItemFactory): AddItem => (
  React.useCallback(() => {
    const newValues = values?.slice() ?? [];

    const removedIndex = newValues.findIndex((newValue: InputValue) => (
      isJSONLDObject(newValue) ? newValue[destroyFieldName] === rdf.literal(true) : false
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
