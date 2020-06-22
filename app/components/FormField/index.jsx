import RDFTypes from '@rdfdev/prop-types';
import rdf, { isTerm } from '@ontologies/core';
import classNames from 'classnames';
import {
  linkType,
  topologyType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import Button from '../Button';
import FieldLabel from '../FieldLabel';
import formFieldWrapper from '../FormFieldWrapper';
import Markdown from '../Markdown';

import './DateTime.scss';
import './FormField.scss';
import FormInputs from './FormInputs';
import { optionsType } from './OptionsWrapper';

const propTypes = {
  autoComplete: PropTypes.string,
  autofocus: PropTypes.bool,
  // Preferably use variants to style this component.
  className: PropTypes.string,
  customErrors: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  // Unique identifier. Used to link label to input.
  field: PropTypes.string.isRequired,
  /** @private */
  fieldApi: PropTypes.shape({
    setTouched: PropTypes.func,
    setValue: PropTypes.func,
  }),
  form: linkType,
  /** Ensure that it matches the label `for` attribute */
  id: PropTypes.string,
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    linkType,
  ]),
  /** @private Contains form-library specific data */
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      RDFTypes.literal,
      RDFTypes.namedNode,
      PropTypes.oneOf([null]),
    ]),
  }),
  inputFieldHint: linkType,
  // Text above input field
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  maxCount: PropTypes.number,
  maxLength: PropTypes.number,
  /** @private Contains form-library specific data */
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    touched: PropTypes.bool,
  }),
  minCount: PropTypes.number,
  minLength: PropTypes.number,
  // Minimal number of rows for textAreas
  minRows: PropTypes.number,
  // Name of the input, defaults to the field name
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  propertyIndex: PropTypes.number,
  required: PropTypes.bool,
  shIn: optionsType,
  storeKey: PropTypes.string,
  targetValue: PropTypes.shape({
    '@id': linkType,
  }),
  theme: PropTypes.string,
  topology: topologyType,
  // HTML input type, e.g. 'email'
  type: PropTypes.string,
  // Modify te look and feel of the FormField
  variant: PropTypes.oneOf([
    'default',
    'material',
    'preview',
  ]),
};

const defaultProps = {
  autofocus: false,
  maxCount: 1,
  minCount: 1,
  variant: 'default',
};

const AddValueButton = ({ addItem, label }) => (
  <div>
    <Button
      theme="transparant"
      onClick={addItem}
    >
      <FontAwesome name="plus" />
      {' '}
      {label}
    </Button>
  </div>
);

AddValueButton.propTypes = {
  addItem: PropTypes.func,
  label: PropTypes.string,
};

const inputValues = (type, input, dirty, initialValue, variableFields) => {
  let currentValue = dirty
    ? input.value
    : input.value || initialValue;

  if (currentValue && !Array.isArray(currentValue)) {
    currentValue = [currentValue];
  }

  if (!currentValue || currentValue.length === 0) {
    if (variableFields) {
      return undefined;
    }

    return [null];
  }

  return currentValue.map((value) => {
    if (type === 'checkbox') {
      const boolNormalized = rdf.literal(!!value);

      return boolNormalized && boolNormalized.value === 'true';
    } else if (type === 'text' || type === 'textarea' || type === 'markdown' || type === 'number' || type === 'email') {
      return isTerm(value) ? value.value : value;
    }

    return value;
  });
};

/**
 * Creates a field for forms.
 *
 * Import with the async container.
 *
 * @returns {component} Component
 */
const FormField = (props) => {
  const {
    className,
    customErrors,
    description,
    initialValue,
    input,
    label,
    meta,
    maxCount,
    minCount,
    required,
    theme,
    type,
    variant,
  } = props;
  const {
    active,
    dirty,
    error,
    invalid,
  } = meta;
  const { name } = input;

  const variableFields = (minCount !== 1 || maxCount > 1) && type !== 'checkboxes';

  const addItem = () => {
    const newValue = input.value?.slice() || [];
    newValue.push(rdf.literal(''));

    input.onChange(newValue);
  };

  const resolvedVariant = theme === 'omniform' ? 'preview' : variant;

  const allErrs = customErrors || error;

  const classes = classNames({
    Field: true,
    [`Field--variant-${resolvedVariant}`]: resolvedVariant,
    'Field--active': active,
    'Field--dirty': dirty,
    'Field--error': !!allErrs,
    [`Field--${type}`]: type,
    'Field--warning': invalid,
    className,
  });

  const Label = () => {
    if (type === 'checkbox' || !label) {
      return null;
    }

    return (
      <FieldLabel
        hidden={theme === 'omniform'}
        htmlFor={name}
        label={label}
        required={required}
      />
    );
  };

  const Description = () => {
    if (type === 'checkbox' || !description) {
      return null;
    }

    return (
      <div className="Field__description"><Markdown text={description} /></div>
    );
  };

  return (
    <div className={`Field ${className ?? ''} ${classes}`}>
      <Label />
      <Description />
      <FormInputs
        {...props}
        allErrs={allErrs}
        fieldId={name}
        values={inputValues(type, input, dirty, initialValue, variableFields)}
        variableFields={variableFields}
      />
      {variableFields && (
        <AddValueButton
          addItem={addItem}
          label={label}
        />
      )}
    </div>
  );
};

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default formFieldWrapper(FormField);
