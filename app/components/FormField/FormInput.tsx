import rdf, { isNamedNode, isTerm } from '@ontologies/core';
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

import { FormInputsProps } from './FormInputs';

interface FormInputProps extends FormInputsProps {
  index: number;
  value: InputValue;
}

const FormInput: React.FC<FormInputProps> = ({
  inputErrors,
  autofocus,
  description,
  field,
  fieldShape,
  index,
  inputComponent: InputComponent,
  label,
  meta,
  name,
  onChange,
  path,
  placeholder,
  renderHelper: HelperRenderer,
  storeKey,
  value,
  values,
}) => {
  const {
    maxLength,
    removable,
    required,
  } = fieldShape || {};
  const {
    dirtySinceLastSubmit,
    pristine,
  } = meta || {};

  if (isMarkedForRemove(value)) {
    return null;
  }
  const removeItem = () => {
    const newValue = values?.slice() || [];
    const curentValue = newValue[index];
    if (isJSONLDObject(curentValue) && isNamedNode(retrieveIdFromValue(curentValue))) {
      curentValue[destroyFieldName] = rdf.literal(true);
    } else {
      newValue.splice(index, 1);
    }

    onChange(newValue);
  };
  const inputOnChange = (val: InputValue) => {
    const newValue = values?.slice() || [];
    newValue[index] = isTerm(val) ? val : rdf.literal(val ?? '');
    onChange(newValue);
  };

  const errors = inputErrors?.filter((err) => err?.index === index);

  return (
    <div className="Field__wrapper" key={[name, index].join('.')}>
      <InputComponent
        autofocus={autofocus && index === 0}
        description={description}
        errors={errors}
        field={field}
        fieldShape={fieldShape}
        id={name}
        inputIndex={index}
        inputValue={value}
        label={label}
        meta={meta}
        name={name}
        path={path}
        placeholder={placeholder}
        storeKey={storeKey}
        values={values}
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
      {HelperRenderer && (
        <HelperRenderer
          description={description}
          error={(dirtySinceLastSubmit || pristine) ? undefined : errors}
          maxLength={maxLength}
          required={required}
          value={value}
        />
      )}
    </div>
  );
};

export default FormInput;
