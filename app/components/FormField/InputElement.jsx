import rdf, { isTerm } from '@ontologies/core';
import classNames from 'classnames';
import {
  Property,
  linkType,
  subjectType,
  topologyType,
  useLRS,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Textarea from 'react-autosize-textarea';

import DatePicker from '../../containers/DatePicker';
import DateTimePicker from '../../containers/DateTimePicker';
import TextEditor from '../../containers/TextEditor';
import form from '../../ontology/form';
import RadioGroup from '../../topologies/RadioGroup';
import CheckboxesInput from '../CheckboxesInput';
import FieldLabel from '../FieldLabel';
import { FormSection } from '../Form';
import { Input } from '../Input';
import FileInput from '../Input/FileInput';
import LocationInput from '../LocationInput';
import { SelectInputWrapper } from '../SelectInput';
import ToggleButtonGroup from '../ToggleButtonGroup';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import OptionsWrapper, { optionsType } from './OptionsWrapper';
import PostalRangeInput from './PostalRangeInput';
import SliderInput from './SliderInput';

import { formFieldError } from './index';

const TEXTFIELD_MIN_ROWS = 3;
const MAX_STR_LEN = 255;

const InputElement = ({
  autoComplete,
  autofocus,
  fieldId,
  formIRI,
  errors,
  initialValue,
  input,
  inputIndex,
  inputValue,
  label,
  meta,
  maxInclusive,
  maxLength,
  minInclusive,
  minLength,
  name,
  onBlur,
  onChange,
  onKeyUp,
  path,
  placeholder,
  required,
  shIn,
  storeKey,
  object,
  propertyIndex,
  subject,
  theme,
  topology,
  type,
  variant,
}) => {
  const lrs = useLRS();
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
    'data-testid': name || fieldId,
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
      const newValue = input.value?.slice() || [];

      if (type === 'file') {
        newValue[inputIndex] = e;
      } else {
        let val;
        if (e && Object.prototype.hasOwnProperty.call(e, 'target')) {
          val = type === 'checkbox' ? e.target.checked : e.target.value;
        } else {
          val = e === null ? '' : e;
        }
        newValue[inputIndex] = isTerm(val) ? val : rdf.literal(val);
      }
      input.onChange(newValue);

      if (onChange) {
        onChange(e);
      }
    },
    required,
    value: inputValue?.value,
  };

  if (type === 'association') {
    const nestedObject = inputValue['@id'];
    const nestedFormIRI = lrs.getResourceProperty(subject, form.form);

    return (
      <FormSection name={fieldId} path={path} propertyIndex={inputIndex}>
        <Property label={form.form}>
          <Property
            childProps={{
              formIRI: nestedFormIRI,
              object: nestedObject,
              theme,
            }}
            label={form.pages}
          />
        </Property>
      </FormSection>
    );
  }

  if (type === 'location') {
    return (
      <LocationInput
        object={object}
        {...sharedProps}
      />
    );
  }

  if (type === 'datetime-local') {
    return (
      <DateTimePicker {...sharedProps} />
    );
  }

  if (type === 'date') {
    return (
      <DatePicker {...sharedProps} />
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
          data-testid={sharedProps['data-testid']}
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
          inputValue,
          sharedProps,
          subject,
        }}
        data-testid={sharedProps['data-testid']}
        shIn={shIn}
        topology={topology}
      />
    );
  }

  if (type === 'radioGroup') {
    return (
      <OptionsWrapper
        Component={RadioGroup}
        componentProps={{
          name: sharedProps.name,
          onChange: sharedProps.onChange,
          required: sharedProps.required,
          value: inputValue?.value,
        }}
        data-testid={sharedProps['data-testid']}
        shIn={shIn}
        topology={topology}
      />
    );
  }

  if (type === 'toggleButtonGroup') {
    return (
      <OptionsWrapper
        Component={ToggleButtonGroup}
        componentProps={{
          name: sharedProps.name,
          onChange: sharedProps.onChange,
          required: sharedProps.required,
          value: inputValue?.value,
        }}
        data-testid={sharedProps['data-testid']}
        shIn={shIn}
        topology={topology}
      />
    );
  }

  if (type === 'file') {
    return (
      <FileInput
        {...sharedProps}
        formIRI={formIRI}
        object={object}
        propertyIndex={propertyIndex}
        required={required}
      />
    );
  }

  if (type === 'postalRange') {
    return (
      <PostalRangeInput
        {...sharedProps}
        className={className}
        data-testid={sharedProps.name}
        inputIndex={inputIndex}
        topology={topology}
        value={inputValue}
      />
    );
  }

  if (type === 'slider') {
    return (
      <SliderInput
        {...sharedProps}
        className={className}
        data-testid={sharedProps.name}
        maxInclusive={maxInclusive}
        minInclusive={minInclusive}
        topology={topology}
        value={inputValue}
      />
    );
  }

  const minRows = maxLength > MAX_STR_LEN ? TEXTFIELD_MIN_ROWS : undefined;

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
      sharedProps.id = storeKey;
      sharedProps.rows = minRows;
      break;
    case 'checkbox': {
      const currentValue = inputValue;
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
  } else if (errors && errors.length > 0 && !pristine && !active) {
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
        value={inputValue?.value}
      />
    );
  }

  return (
    <div className={className}>
      <Input
        {...sharedProps}
        autoComplete={autoComplete}
        element={element}
        // TODO: [AOD-218] HTML only noscript
        // maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        required={required}
        type={type}
        value={inputValue?.value}
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
  description: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  fieldId: PropTypes.string.isRequired,
  formIRI: linkType,
  /** Ensure that it matches the label `for` attribute */
  id: PropTypes.string,
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    linkType,
  ]),
  /** @private Contains form-library specific data */
  input: linkType,
  inputIndex: PropTypes.number,
  inputValue: linkType,
  // Text above input field
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  maxCount: PropTypes.number,
  maxInclusive: PropTypes.number,
  maxLength: PropTypes.number,
  /** @private Contains form-library specific data */
  meta: PropTypes.oneOfType([
    null,
    PropTypes.shape({
      active: PropTypes.bool,
      dirty: PropTypes.bool,
      error: PropTypes.arrayOf(formFieldError),
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      touched: PropTypes.bool,
    }),
  ]),
  minCount: PropTypes.number,
  minInclusive: PropTypes.number,
  minLength: PropTypes.number,
  // Minimal number of rows for textAreas
  minRows: PropTypes.number,
  // Name of the input, defaults to the field name
  name: PropTypes.string,
  object: linkType,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  path: linkType,
  placeholder: PropTypes.string,
  propertyIndex: PropTypes.number,
  required: PropTypes.bool,
  shIn: optionsType,
  storeKey: PropTypes.string,
  subject: subjectType,
  submissionErrors: PropTypes.objectOf(PropTypes.arrayOf(formFieldError)),
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
