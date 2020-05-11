import React from 'react';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import Button from '../Button';
import CheckboxesInput from '../CheckboxesInput';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import FieldHelper from './FieldHelper';
import InputElement from './InputElement';
import OptionsWrapper from './OptionsWrapper';

const FormInputs = (props) => {
  const {
    allErrs,
    description,
    input,
    maxLength,
    meta,
    variableFields,
    required,
    shIn,
    topology,
    type,
    values,
    variant,
  } = props;
  const { pristine } = meta;

  if (!values) {
    return null;
  }

  if (type === 'checkboxes') {
    return (
      <OptionsWrapper
        Component={CheckboxesInput}
        componentProps={{
          onChange: input.onChange,
          values: input.value,
        }}
        shIn={shIn}
        topology={topology}
      />
    );
  }

  return values.map((value, index) => {
    const removeItem = () => {
      const newValue = input.value?.slice() || [];
      newValue.splice(index, 1);

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
      } else if (required) {
        helperText = (
          <FormattedMessage
            defaultMessage="*Required"
            id="https://app.argu.co/i18n/forms/required/helperText"
          />
        );
      }

      return (
        <FieldHelper
          error={pristine ? undefined : errors}
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
      <React.Fragment key={[input.name, index].join('.')}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <InputElement
            {...props}
            errors={errors}
            inputIndex={index}
            inputValue={value}
            variant={variant}
          />
          {variableFields && (
            <Button
              theme="transparant"
              onClick={removeItem}
            >
              <FontAwesome name="times" />
            </Button>
          )}
        </div>
        {inputHelper()}
      </React.Fragment>
    );
  });
};

export default FormInputs;
