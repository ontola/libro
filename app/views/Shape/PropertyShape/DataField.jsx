import rdf from '@ontologies/core';
import xsd from '@ontologies/xsd';
import {
  linkType,
  subjectType,
  topologyType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import FormField from '../../../containers/FormField';
import { tryParseInt } from '../../../helpers/numbers';
import validators, { combineValidators } from '../../../helpers/validators';
import fhir from '../../../ontology/fhir';
import ll from '../../../ontology/ll';
import ontola from '../../../ontology/ontola';

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
  maxLength,
  theme
) => {
  if (shIn) {
    if (tryParseInt(maxCount) > 1) {
      return 'checkboxes';
    }

    return 'select';
  }

  switch (rdf.id(datatype)) {
    case rdf.id(xsd.boolean):
      return 'checkbox';
    case rdf.id(xsd.date):
      return 'date';
    case rdf.id(xsd.dateTime):
      return 'datetime-local';
    case rdf.id(xsd.integer):
    case rdf.id(xsd.long):
    case rdf.id(xsd.int):
    case rdf.id(xsd.short):
    case rdf.id(xsd.byte):
    case rdf.id(xsd.decimal):
      return 'number';
    case rdf.id(ll.blob):
      return 'file';
    case rdf.id(fhir.markdown):
      if (theme === 'omniform') {
        return 'textarea';
      }

      return 'markdown';
    case rdf.id(ontola.ns('datatype/password')):
      return 'password';
    default:
      if (tryParseInt(maxLength) > MAX_STR_LEN) {
        return 'textarea';
      }

      return 'text';
  }
};

const descriptionValue = (description, helperText, inputType) => {
  if (inputsPreferringPlaceholder.includes(inputType)) {
    return helperText?.value;
  }

  return description?.value || helperText?.value;
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
    helperText,
    inputFieldHint,
    maxCount,
    maxLength,
    minCount,
    minLength,
    name,
    onKeyUp,
    propertyIndex,
    shIn,
    subjectCtx,
    targetValue,
    targetValues,
    theme,
    topology,
  } = props;

  const inputValues = targetValues.length > 0 ? targetValues : defaultValue;
  const inputType = determineInputType(
    datatype,
    shIn,
    maxCount,
    maxLength,
    theme
  );
  const required = tryParseInt(minCount) > 0;
  const validate = [
    maxCount && validators.maxCount(tryParseInt(maxCount)),
    maxLength && validators.maxLength(tryParseInt(maxLength)),
    minCount && validators.minCount(tryParseInt(minCount)),
    minLength && validators.minLength(tryParseInt(minLength)),
    required && validators.required,
  ];

  return (
    <FormField
      validateOnChange
      autoComplete="off"
      autofocus={autofocus}
      description={descriptionValue(description, helperText, inputType)}
      field={fieldName}
      form={subjectCtx}
      initialValue={inputValues}
      inputFieldHint={inputFieldHint}
      label={name && name.value}
      maxCount={tryParseInt(maxCount)}
      maxLength={tryParseInt(maxLength)}
      minCount={tryParseInt(minCount)}
      minLength={tryParseInt(minLength)}
      minRows={tryParseInt(maxLength) > MAX_STR_LEN ? TEXTFIELD_MIN_ROWS : undefined}
      placeholder={placeholderValue(description, inputType)}
      propertyIndex={propertyIndex}
      required={required}
      shIn={shIn}
      targetValue={targetValue}
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
  helperText: linkType,
  inputFieldHint: linkType,
  maxCount: linkType,
  maxLength: linkType,
  minCount: linkType,
  minLength: linkType,
  name: linkType,
  onKeyUp: PropTypes.func,
  propertyIndex: PropTypes.number,
  shIn: linkType,
  subjectCtx: subjectType,
  targetValue: PropTypes.shape({
    '@id': linkType,
  }),
  targetValues: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': linkType,
    })
  ),
  theme: PropTypes.string,
  topology: topologyType,
};

export default DataField;
