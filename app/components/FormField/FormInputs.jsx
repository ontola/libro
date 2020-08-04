import rdf, { isNamedNode } from '@ontologies/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import { destroyFieldName, isMarkedForRemove } from '../../helpers/forms';
import Button from '../Button';
import CheckboxesInput from '../CheckboxesInput';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import FieldHelper from './FieldHelper';
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

    const inputHelper = () => {
      const renderHelper = type === 'checkbox'
        ? !!description
        : variant !== 'preview' || (!pristine && errors);
      const renderCharCounter = variant !== 'preview';

      if (!renderHelper) {
        return null;
      }

      let helperText;

      if (type === 'checkbox') {
        helperText = description;
      } else if (required && type !== 'association') {
        helperText = (
          <FormattedMessage
            defaultMessage="*Required"
            id="https://app.argu.co/i18n/forms/required/helperText"
          />
        );
      }

      return (
        <FieldHelper
          error={(dirtySinceLastSubmit || pristine) ? undefined : errors}
          helperText={helperText}
          right={renderCharCounter ? (
            <CharCounter
              maxLength={maxLength}
              threshold={CHAR_COUNTER_THRESHOLD}
              value={value}
            />
          ) : undefined}
          variant={variant}
        />
      );
    };

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
        {inputHelper()}
      </div>
    );
  });
};

export default FormInputs;
