import RDFTypes from '@rdfdev/prop-types';
import rdf, { isTerm } from '@ontologies/core';
import classNames from 'classnames';
import {
  linkType,
  topologyType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import FieldLabel from '../FieldLabel';
import formFieldWrapper from '../FormFieldWrapper';
import Markdown from '../Markdown';

import './DateTime.scss';
import './FormField.scss';
import { optionsType } from './OptionsWrapper';
import InputElement from './InputElement';
import FieldHelper from './FieldHelper';
import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';

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
  variant: 'default',
};

const inputValue = (type, input, dirty, initialValue) => {
  if (type === 'file') {
    return undefined;
  }

  const currentValue = dirty
    ? input.value
    : input.value || initialValue;

  let nextValue = currentValue;
  if (type === 'checkbox') {
    const boolNormalized = rdf.literal(!!currentValue);
    nextValue = boolNormalized && boolNormalized.value === '1';
  } else if (type === 'checkboxes') {
    nextValue = currentValue;
  } else if (type === 'text' || type === 'textarea' || type === 'markdown' || type === 'number') {
    nextValue = isTerm(currentValue)
      ? currentValue.value
      : currentValue;
  }

  return nextValue ?? undefined;
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
    field,
    initialValue,
    input,
    id,
    label,
    maxLength,
    meta,
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
    pristine,
  } = meta;
  const resolvedVariant = theme === 'omniform' ? 'preview' : variant;
  const value = inputValue(type, input, dirty, initialValue);
  const fieldId = id || (field || '')
    .split('.')
    .map((v) => (Number.isNaN(Number.parseInt(v, 10)) ? atob(v) : v))
    .join('.');

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
        htmlFor={fieldId}
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

  const inputHelper = () => {
    const renderHelper = type === 'checkbox'
      ? !!description
      : resolvedVariant !== 'preview' || (!pristine && error);
    const renderCharCounter = resolvedVariant !== 'preview';

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
        error={pristine ? undefined : allErrs}
        helperText={helperText}
        right={renderCharCounter ? (
          <CharCounter
            maxLength={maxLength}
            threshold={CHAR_COUNTER_THRESHOLD}
            value={value}
          />
        ) : undefined}
        variant={resolvedVariant}
      />
    );
  };

  return (
    <div className={`Field ${className ?? ''} ${classes}`}>
      <Label />
      <Description />
      <InputElement
        {...props}
        errors={allErrs}
        inputValue={value}
        variant={resolvedVariant}
      />
      {inputHelper()}
    </div>
  );
};

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default formFieldWrapper(FormField);
