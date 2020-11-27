import rdf, { isNamedNode } from '@ontologies/core';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { destroyFieldName, isMarkedForRemove } from '../../helpers/forms';
import Button from '../Button';
import CheckboxesInput from '../CheckboxesInput';

import InputElement from './InputElement';
import OptionsWrapper from './OptionsWrapper';

const FormInputs = (props) => {
  const {
    allErrs,
    autofocus,
    description,
    input,
    maxLength,
    meta,
    removable,
    renderHelper: HelperRenderer,
    required,
    shIn,
    topology,
    type,
    values,
    variant,
  } = props;
  const {
    dirtySinceLastSubmit,
    pristine,
  } = meta;

  if (!values) {
    return null;
  }

  if (type === 'checkboxes') {
    return (
      <OptionsWrapper
        Component={CheckboxesInput}
        componentProps={{
          onChange: input.onChange,
          required,
          values: input.value,
        }}
        shIn={shIn}
        topology={topology}
      />
    );
  }

  return values.map((value, index) => {
    if (isMarkedForRemove(value)) {
      return null;
    }
    const removeItem = () => {
      const newValue = input.value?.slice() || [];
      if (isNamedNode(newValue[index]['@id'])) {
        newValue[index][destroyFieldName] = rdf.literal(true);
      } else {
        newValue.splice(index, 1);
      }

      input.onChange(newValue);
    };

    const errors = allErrs?.filter((err) => err?.index === index);

    return (
      <div className="Field__wrapper" key={[input.name, index].join('.')}>
        <InputElement
          {...props}
          autofocus={autofocus && index === 0}
          errors={errors}
          inputIndex={index}
          inputValue={value}
          variant={variant}
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
        <HelperRenderer
          description={description}
          error={(dirtySinceLastSubmit || pristine) ? undefined : errors}
          maxLength={maxLength}
          required={required}
          value={value}
          variant={variant}
        />
      </div>
    );
  });
};

export default FormInputs;
