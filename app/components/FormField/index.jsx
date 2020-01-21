import RDFTypes from '@rdfdev/prop-types';
import rdf, { isLiteral, isTerm } from '@ontologies/core';
import classNames from 'classnames';
import {
  linkType,
  lrsType,
  topologyType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Textarea from 'react-autosize-textarea';
import { FormattedMessage } from 'react-intl';

import DateTimePicker from '../../containers/DateTimePicker';
import DatePicker from '../../containers/DatePicker';
import TextEditor from '../../containers/TextEditor';
import argu from '../../ontology/argu';
import FieldLabel from '../FieldLabel';
import formFieldWrapper from '../FormFieldWrapper';
import FileInput from '../Input/FileInput';
import { Input } from '../Input';
import Markdown from '../Markdown';
import { SelectInputWrapper } from '../SelectInput';
import CheckboxesInput from '../CheckboxesInput';

import CharCounter from './CharCounter';
import FieldHelper from './FieldHelper';
import OptionsWrapper, { optionsType } from './OptionsWrapper';

import './DateTime.scss';
import './FormField.scss';

const CHAR_COUNTER_THRESHOLD = 0.8;

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
  lrs: lrsType,
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
  required: PropTypes.bool,
  shIn: optionsType,
  storeKey: PropTypes.string,
  theme: PropTypes.string,
  topology: topologyType,
  // HTML input type, e.g. 'email'
  type: PropTypes.string,
  validate: PropTypes.func,
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

/**
 * Creates a field for forms.
 *
 * Import with the async container.
 *
 * @returns {component} Component
 */
class FormField extends React.PureComponent {
  inputValue() {
    const {
      input: { value },
      meta: { dirty },
      initialValue,
      type,
    } = this.props;

    if (type === 'file') {
      return undefined;
    }

    const currentValue = dirty
      ? value
      : value || initialValue;

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
  }

  charCounter() {
    const {
      maxLength,
    } = this.props;

    const value = this.inputValue();
    const currentLength = isLiteral(value) ? value.value.length : value?.length;

    if (!currentLength || (currentLength / maxLength) <= CHAR_COUNTER_THRESHOLD) {
      return null;
    }

    return (
      <CharCounter
        currentLength={currentLength}
        maxLength={maxLength}
      />
    );
  }

  description() {
    return this.props.description && (
      <div className="Field__description"><Markdown text={this.props.description} /></div>
    );
  }

  helper() {
    const {
      customErrors,
      description,
      meta: {
        error,
        pristine,
      },
      required,
      type,
    } = this.props;

    const renderHelper = type === 'checkbox'
      ? !!description
      : this.variant() !== 'preview' || (!pristine && (customErrors || error));
    const renderCharCounter = this.variant() !== 'preview';

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
        error={pristine ? undefined : customErrors || error}
        helperText={helperText}
        right={renderCharCounter ? this.charCounter() : undefined}
        variant={this.variant()}
      />
    );
  }

  inputElement(errors) {
    const {
      autoComplete,
      autofocus,
      field,
      initialValue,
      input,
      inputFieldHint,
      id,
      meta: { active, pristine },
      minLength,
      name,
      onBlur,
      onChange,
      onKeyUp,
      placeholder,
      required,
      shIn,
      storeKey,
      minRows,
      topology,
      type,
    } = this.props;

    const fieldTxt = this.plainFieldName();

    const className = classNames({
      Field__input: true,
      [`Field__input--${type || 'text'}`]: true,
      'Field__input--active': active,
    });

    const sharedProps = {
      autoFocus: autofocus,
      errors,
      id: id || fieldTxt,
      name: name || fieldTxt,
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
      const inputValue = this.inputValue();
      const value = inputValue && Object.prototype.hasOwnProperty.call(inputValue, 'termType')
        ? inputValue.value
        : inputValue;

      return (
        <DateTimePicker
          {...sharedProps}
          data-testid={sharedProps.name}
          value={value || null}
          onChange={sharedProps.onChange}
        />
      );
    }

    if (type === 'date') {
      const inputValue = this.inputValue();
      const value = inputValue && Object.prototype.hasOwnProperty.call(inputValue, 'termType')
        ? inputValue.value
        : inputValue;

      return (
        <DatePicker
          {...sharedProps}
          data-testid={sharedProps.name}
          value={value || null}
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
              value: this.inputValue(),
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
            inputValue: this.inputValue(),
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
      trailer = this.label();
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
    } else if (this.variant() === 'preview') {
      trailer = this.charCounter();
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
          value={this.inputValue()}
          onKeyUp={onKeyUp}
        />
        {trailer}
      </div>
    );
  }

  label() {
    const {
      id,
      label,
      required,
      theme,
    } = this.props;

    if (label) {
      return (
        <FieldLabel
          hidden={theme === 'omniform'}
          htmlFor={id || this.plainFieldName()}
          label={label}
          required={required}
        />
      );
    }

    return null;
  }

  plainFieldName() {
    if (!this.props.field) {
      return '';
    }

    return this.props
      .field
      .split('.')
      .map((v) => (Number.isNaN(Number.parseInt(v, 10)) ? atob(v) : v))
      .join('.');
  }

  variant() {
    return this.props.theme === 'omniform' ? 'preview' : this.props.variant;
  }

  render() {
    const {
      customErrors,
      className,
      type,
    } = this.props;

    const {
      active,
      dirty,
      error,
      invalid,
    } = this.props.meta;
    const allErrs = customErrors || error;
    const variant = this.variant();

    const classes = classNames({
      Field: true,
      [`Field--variant-${variant}`]: variant,
      'Field--active': active,
      'Field--dirty': dirty,
      'Field--error': !!allErrs,
      [`Field--${type}`]: type,
      'Field--warning': invalid,
      className,
    });

    return (
      <div className={`Field ${className ?? ''} ${classes}`}>
        {type !== 'checkbox' && this.label()}
        {type !== 'checkbox' && this.description()}
        {this.inputElement(allErrs)}
        {this.helper()}
      </div>
    );
  }
}

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default formFieldWrapper(FormField);
