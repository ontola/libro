import React from 'react';

import {
  InputValue,
  ItemFactory,
  OnInputChange,
} from '../components/FormField/FormFieldTypes';

type AddItem = () => void;

/**
 * Returns a callback to add values to a form input.
 */
const useAddFormValue = (values: InputValue[], onChange: OnInputChange, itemFactory: ItemFactory): AddItem => (
  React.useCallback(() => {
    const newValues = values?.slice() ?? [];

    newValues.push(itemFactory());

    onChange(newValues);
  }, [values, onChange, itemFactory])
);

export default useAddFormValue;
