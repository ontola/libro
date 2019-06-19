import classNames from 'classnames';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal, NamedNode } from 'rdflib';
import React from 'react';
import Textarea from 'react-autosize-textarea';
import DateTimePicker from 'react-datetime-picker';
import { FormattedMessage } from 'react-intl';

import TextEditor from '../../containers/TextEditor';
import { NS } from '../../helpers/LinkedRenderStore';
import FieldLabel from '../FieldLabel';
import formFieldWrapper from '../FormFieldWrapper';
import FileInput from '../Input/FileInput';
import { Input } from '../Input';
import SelectInput, { optionsType } from '../SelectInput';
import CheckboxesInput from '../CheckboxesInput';

import CharCounter from './CharCounter';
import FieldHelper from './FieldHelper';

import './DateTime.scss';
import './FormField.scss';

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
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Literal),
      PropTypes.instanceOf(NamedNode),
    ]),
  }),
  // Text above input field
  label: PropTypes.string,
  maxLength: PropTypes.number,
  /** @private Contains form-library specific data */
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    invalid: PropTypes.bool,
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
  options: optionsType,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  storeKey: PropTypes.string.isRequired,
  theme: PropTypes.string,
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
    reader.onload = () => resolve(new Literal(
      reader.result,
      undefined,
      NS.argu(`base64File?filename=${encodeURIComponent(file.name)}`)
    ));
    reader.onerror = error => reject(error);
  });
}

/**
 * Creates a field for forms.
 * @returns {component} Component
 */
class FormField extends React.PureComponent {
  static persistState(props, nextValue) {
    const {
      input: { name, value },
      meta: { touched },
      storeKey,
      type,
    } = props;

    if (storeKey && !['password', 'hidden'].includes(type) && (touched || nextValue !== value)) {
      if (__CLIENT__) {
        sessionStorage.setItem(`${storeKey}.${name}`, nextValue || '');
      }
    }
  }

  componentDidMount() {
    if (!this.props.input.value) {
      this.props.input.onChange(this.inputValue());
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.field !== prevProps.field && !this.props.input.value) {
      this.props.input.onChange(this.inputValue());
    }
  }

  componentWillUnmount() {
    this.props.input.onChange(undefined);
  }

  inputValue() {
    const {
      input: { name, value },
      meta: { dirty },
      initialValue,
      storeKey,
      type,
    } = this.props;

    if (type === 'file') {
      return undefined;
    }

    const currentValue = dirty
      ? value
      : value || initialValue || (__CLIENT__ ? sessionStorage.getItem(`${storeKey}.${name}`) : undefined);

    let nextValue = currentValue;
    if (type === 'checkbox') {
      const boolNormalized = Literal.fromBoolean(currentValue);
      nextValue = boolNormalized && boolNormalized.value === '1';
    } else if (type === 'textarea') {
      nextValue = currentValue && Object.prototype.hasOwnProperty.call(currentValue, 'termType')
        ? currentValue.value
        : currentValue;
    }

    return nextValue || undefined;
  }

  charCounter() {
    const {
      maxLength,
    } = this.props;

    const value = this.inputValue();
    const currentLength = value instanceof Literal ? value.value.length : value?.length;

    return (
      <CharCounter
        currentLength={currentLength}
        maxLength={maxLength}
      />
    );
  }

  description() {
    return this.props.description && (
      <div className="Field__description">{this.props.description}</div>
    );
  }

  helper() {
    const {
      customErrors,
      description,
      meta: {
        error,
        touched,
      },
      required,
      type,
    } = this.props;

    const renderHelper = type === 'checkbox'
      ? !!description
      : this.variant() !== 'preview' || (touched && (customErrors || error));
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
        error={customErrors || error}
        helperText={helperText}
        right={renderCharCounter && this.charCounter()}
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
      id,
      meta: { active, touched },
      minLength,
      name,
      onBlur,
      onChange,
      onKeyUp,
      options,
      placeholder,
      required,
      minRows,
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
        this.saveInputValue(type === 'checkbox' ? e.target.checked : e.target.value);
        if (onChange) {
          onChange(e);
        }
        return undefined;
      },
      required,
    };

    if (type === 'datetime-local') {
      const inputValue = this.inputValue();
      const value = inputValue && Object.prototype.hasOwnProperty.call(inputValue, 'termType')
        ? inputValue.value
        : inputValue;
      const date = value && new Date(value);

      return (
        <DateTimePicker
          value={date}
          onChange={e => this.saveInputValue(e === null ? Literal.find('') : e)}
        />
      );
    }

    if (type === 'checkboxes') {
      return (
        <div className={className}>
          <CheckboxesInput
            initialSelectedItem={initialValue}
            options={options}
            sharedProps={sharedProps}
            value={this.inputValue()}
            onChange={values => this.saveInputValue(values)}
          />
        </div>
      );
    }

    if (type === 'select') {
      return (
        <div className={className}>
          <SelectInput
            initialSelectedItem={initialValue}
            options={options}
            sharedProps={sharedProps}
            value={this.inputValue()}
          />
        </div>
      );
    }

    if (type === 'file') {
      return (
        <FileInput
          {...sharedProps}
          onChange={e => new Promise(() => {
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
        sharedProps.minRows = minRows;
        break;
      case 'checkbox': {
        const currentValue = input.value;
        sharedProps.checked = currentValue && (currentValue === true || currentValue.value === 'true');
        break;
      } default:
        element = 'input';
    }

    let trailer = null;

    if (type === 'checkbox') {
      trailer = this.label();
    } else if (errors && touched) {
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
      .map(v => (Number.isNaN(Number.parseInt(v, 10)) ? atob(v) : v))
      .join('.');
  }

  saveInputValue(nextValue) {
    const {
      input: { onChange },
      type,
    } = this.props;

    if (!['password', 'hidden'].includes(type)) {
      FormField.persistState(this.props, nextValue);
    }
    onChange(nextValue);
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
