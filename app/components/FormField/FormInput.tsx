import rdf, {
  isNamedNode,
  isTerm,
} from '@ontologies/core';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  destroyFieldName,
  isMarkedForRemove,
  retrieveIdFromValue,
} from '../../helpers/forms';
import { isJSONLDObject } from '../../helpers/types';
import { InputValue } from '../../hooks/useFormField';
import Button from '../Button';

import { FormFieldContext } from './FormField';
import FormFieldHelper from './FormFieldHelper';

interface FormInputProps {
  index: number;
  value: InputValue;
}

const FormInput: React.FC<FormInputProps> = ({
  index,
  value,
}) => {
  const {
    inputErrors,
    autofocus,
    fieldShape,
    inputComponent: InputComponent,
    name,
    onChange,
    values,
  } = React.useContext(FormFieldContext);
  const { removable } = fieldShape;

  if (isMarkedForRemove(value)) {
    return null;
  }

  const removeItem = React.useCallback(() => {
    const newValue = values?.slice() || [];
    const curentValue = newValue[index];

    if (isJSONLDObject(curentValue) && isNamedNode(retrieveIdFromValue(curentValue))) {
      curentValue[destroyFieldName] = rdf.literal(true);
    } else {
      newValue.splice(index, 1);
    }

    onChange(newValue);
  }, [values, index, onChange]);
  const inputOnChange = React.useCallback((val: InputValue) => {
    const newValue = values?.slice() || [];
    newValue[index] = isTerm(val) ? val : rdf.literal(val ?? '');
    onChange(newValue);
  }, [values, index, onChange]);

  const errors = React.useMemo(() => (
    inputErrors.filter((err) => err?.index === index)
  ), [inputErrors, index]);

  return (
    <div
      className="Field__wrapper"
      key={[name, index].join('.')}
    >
      <InputComponent
        autofocus={(autofocus && index === 0) ?? false}
        errors={errors}
        inputIndex={index}
        inputValue={value}
        onChange={inputOnChange}
      />
      {removable && (
        <Button
          plain
          className="Field__input__remove-button"
          onClick={removeItem}
        >
          <FontAwesome name="times" />
        </Button>
      )}
      <FormFieldHelper
        error={errors?.[0]}
        value={value}
      />
    </div>
  );
};

export default FormInput;
