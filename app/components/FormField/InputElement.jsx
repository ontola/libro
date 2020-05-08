import rdf from '@ontologies/core';
import RDFTypes from '@rdfdev/prop-types';
import classNames from 'classnames';
import { linkType, topologyType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Textarea from 'react-autosize-textarea';

import DatePicker from '../../containers/DatePicker';
import DateTimePicker from '../../containers/DateTimePicker';
import TextEditor from '../../containers/TextEditor';
import argu from '../../ontology/argu';
import CheckboxesInput from '../CheckboxesInput';
import FieldLabel from '../FieldLabel';
import { Input } from '../Input';
import FileInput from '../Input/FileInput';
import { SelectInputWrapper } from '../SelectInput';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import OptionsWrapper, { optionsType } from './OptionsWrapper';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(rdf.literal(
      reader.result,
      undefined,
      argu.ns(`base64File?filename=${encodeURIComponent(file.name)}`)
    ));
    reader.onerror = (error) => reject(error);
  });
}

const InputElement = ({
  autoComplete,
  autofocus,
  field,
  fieldId,
  form,
  errors,
  initialValue,
  input,
  inputFieldHint,
  inputValue,
  label,
  meta,
  maxLength,
  minLength,
  minRows,
  name,
  onBlur,
  onChange,
  onKeyUp,
  placeholder,
  required,
  shIn,
  storeKey,
  propertyIndex,
  targetValue,
  topology,
  type,
  variant,
}) => {
  const {
    active,
    pristine,
  } = meta;

  const className = classNames({
    Field__input: true,
    [`Field__input--${type || 'text'}`]: true,
    'Field__input--active': active,
  });

  const sharedProps = {
    autoFocus: autofocus,
    errors,
    id: fieldId,
    name: name || fieldId,
    ...input,
    onBlur: (e) => {
      input.onBlur(e);
      if (onBlur) {
        onBlur(e);
      }
    },
    onChange: (e) => {
      if (e && Object.prototype.hasOwnProperty.call(e, 'target')) {
        input.onChange(type === 'checkbox' ? e.target.checked : e.target.value);
      } else {
        input.onChange(e === null ? rdf.literal('') : e);
      }

      if (onChange) {
        onChange(e);
      }
    },
    required,
  };

  if (type === 'datetime-local') {
    return (
      <DateTimePicker
        {...sharedProps}
        data-testid={sharedProps.name}
        value={inputValue}
        onChange={sharedProps.onChange}
      />
    );
  }

  if (type === 'date') {
    return (
      <DatePicker
        {...sharedProps}
        data-testid={sharedProps.name}
        value={inputValue}
        onChange={sharedProps.onChange}
      />
    );
  }

  if (type === 'checkboxes') {
    return (
      <div className={className}>
        <OptionsWrapper
          Component={CheckboxesInput}
          componentProps={{
            onChange: sharedProps.onChange,
            sharedProps,
            value: inputValue,
          }}
          data-testid={sharedProps.name}
          shIn={shIn}
          topology={topology}
        />
      </div>
    );
  }

  if (type === 'select') {
    return (
      <OptionsWrapper
        Component={SelectInputWrapper}
        componentProps={{
          className,
          initialValue,
          inputFieldHint,
          inputValue,
          sharedProps,
        }}
        data-testid={sharedProps.name}
        shIn={shIn}
        topology={topology}
      />
    );
  }

  if (type === 'file') {
    return (
      <FileInput
        {...sharedProps}
        data-testid={sharedProps.name}
        form={form}
        propertyIndex={propertyIndex}
        targetValue={targetValue}
        onChange={(e) => new Promise(() => {
          if (!e) {
            field.onChange(undefined);

            return onChange && onChange(undefined, undefined);
          }

          let file = e;

          if (Array.isArray(e)) {
            [file] = e;
          }
          if (Object.prototype.hasOwnProperty.call(e, 'target')
            && Object.prototype.hasOwnProperty.call(e.target, 'files')) {
            [file] = e.target.files;
          }

          return getBase64(file)
            .then((enc) => {
              input.onChange(enc);
              if (onChange) {
                onChange(enc, e);
              }
            });
        })}
      />
    );
  }

  let element;
  switch (type) {
    case 'textarea':
      element = Textarea;
      sharedProps.async = true;
      sharedProps.rows = minRows;
      sharedProps.maxRows = 50;
      break;
    case 'markdown':
      element = TextEditor;
      sharedProps.id = `${storeKey}.${sharedProps.id}`;
      sharedProps.rows = minRows;
      break;
    case 'checkbox': {
      const currentValue = input.value;
      sharedProps.checked = currentValue && (
        currentValue === true
        || currentValue === 'true'
        || currentValue.value === 'true'
      );
      break;
    } default:
      element = 'input';
  }

  let trailer = null;

  if (type === 'checkbox') {
    trailer = (
      <FieldLabel
        htmlFor={fieldId}
        label={label}
      />
    );
  } else if (errors && !pristine && !active) {
    trailer = (
      <span
        className="Field__input--trailing-icon fa fa-exclamation-circle"
        style={{
          color: '#c81414',
        }}
        title={errors[0]}
      />
    );
  } else if (variant === 'preview') {
    trailer = (
      <CharCounter
        maxLength={maxLength}
        threshold={CHAR_COUNTER_THRESHOLD}
        value={inputValue}
      />
    );
  }

  return (
    <div className={className}>
      <Input
        {...sharedProps}
        autoComplete={autoComplete}
        data-testid={sharedProps.name}
        element={element}
        // TODO: [AOD-218] HTML only noscript
        // maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        required={required}
        type={type}
        value={inputValue}
        onKeyUp={onKeyUp}
      />
      {trailer}
    </div>
  );
};

InputElement.propTypes = {
  autoComplete: PropTypes.string,
  autofocus: PropTypes.bool,
  // Preferably use variants to style this component.
  className: PropTypes.string,
  customErrors: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  // Unique identifier. Used to link label to input.
  field: PropTypes.string.isRequired,
  fieldId: PropTypes.string.isRequired,
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
  inputValue: PropTypes.string,
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

export default InputElement;
