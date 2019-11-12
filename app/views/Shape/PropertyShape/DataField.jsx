import { linkType, topologyType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { FormField } from '../../../components';
import { tryParseInt } from '../../../helpers/numbers';
import { NS } from '../../../helpers/LinkedRenderStore';
import validators, { combineValidators } from '../../../helpers/validators';

const TEXTFIELD_MIN_ROWS = 3;
const MAX_STR_LEN = 255;

const inputsPreferringPlaceholder = [
  'markdown',
  'text',
  'textarea',
];

const determineInputType = (
  datatype,
  shIn,
  maxCount,
  maxLength
) => {
  if (shIn) {
    if (tryParseInt(maxCount) > 1) {
      return 'checkboxes';
    }

    return 'select';
  }

  switch (datatype) {
    case NS.xsd('boolean'):
      return 'checkbox';
    case NS.xsd('date'):
      return 'date';
    case NS.xsd('dateTime'):
      return 'datetime-local';
    case NS.xsd('integer'):
    case NS.xsd('long'):
    case NS.xsd('int'):
    case NS.xsd('short'):
    case NS.xsd('byte'):
    case NS.xsd('decimal'):
      return 'number';
    case NS.ll('blob'):
      return 'file';
    case NS.fhir('markdown'):
      return 'markdown';
    case NS.ontola('datatype/password'):
      return 'password';
    default:
      if (tryParseInt(maxLength) > MAX_STR_LEN) {
        return 'textarea';
      }

      return 'text';
  }
};

const descriptionValue = (description, inputType) => {
  if (inputsPreferringPlaceholder.includes(inputType)) {
    return null;
  }

  return description?.value;
};

const placeholderValue = (description, inputType) => {
  if (!inputsPreferringPlaceholder.includes(inputType)) {
    return null;
  }

  return description?.value;
};

const DataField = (props) => {
  const {
    autofocus,
    datatype,
    defaultValue,
    description,
    fieldName,
    inputFieldHint,
    maxCount,
    maxLength,
    minCount,
    minLength,
    name,
    onKeyUp,
    shIn,
    targetValues,
    theme,
    topology,
  } = props;

  const inputValues = targetValues.length > 0 ? targetValues : defaultValue;
  const inputType = determineInputType(
    datatype,
    shIn,
    maxCount,
    maxLength
  );
  const required = minCount && Number(minCount.value) > 0;
  const validate = [
    maxLength && validators.maxLength(tryParseInt(maxLength)),
    required && validators.required,
    minLength && validators.minLength(tryParseInt(minLength)),
  ];

  return (
    <FormField
      validateOnChange
      autoComplete="off"
      autofocus={autofocus}
      description={descriptionValue(description, inputType)}
      field={fieldName}
      initialValue={inputType === 'checkboxes' ? inputValues : inputValues?.[0]}
      inputFieldHint={inputFieldHint}
      label={name && name.value}
      maxLength={tryParseInt(maxLength)}
      minLength={tryParseInt(minLength)}
      minRows={maxLength > MAX_STR_LEN ? TEXTFIELD_MIN_ROWS : undefined}
      placeholder={placeholderValue(description, inputType)}
      required={required}
      shIn={shIn}
      theme={theme}
      topology={topology}
      type={inputType}
      validate={combineValidators(validate)}
      onKeyUp={onKeyUp}
    />
  );
};

DataField.propTypes = {
  autofocus: PropTypes.bool,
  datatype: linkType,
  defaultValue: linkType,
  description: linkType,
  fieldName: PropTypes.string,
  inputFieldHint: linkType,
  maxCount: linkType,
  maxLength: linkType,
  minCount: linkType,
  minLength: linkType,
  name: linkType,
  onKeyUp: PropTypes.func,
  shIn: linkType,
  targetValues: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': linkType,
    })
  ),
  theme: PropTypes.string,
  topology: topologyType,
};

export default DataField;
