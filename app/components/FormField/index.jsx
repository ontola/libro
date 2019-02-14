import classNames from 'classnames';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import { Literal, NamedNode } from 'rdflib';
import React from 'react';
import Textarea from 'react-autosize-textarea';
import DateTimePicker from 'react-datetime-picker';
import { Field } from 'react-final-form';

import TextEditor from '../../containers/TextEditor';
import { NS } from '../../helpers/LinkedRenderStore';
import { FormSectionContext } from '../Form/FormSection';
import FileInput from '../Input/FileInput';
import { Input } from '../Input';
import SelectInput, { optionsType } from '../SelectInput';

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
  /** @private */
  forwardedRef: PropTypes.shape({ value: PropTypes.instanceOf(HTMLInputElement) }),
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

const MessagesProps = {
  bottom: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  warning: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

const MessagesDefaultProps = {
  bottom: false,
};

const Messages = ({ error, warning, bottom }) => {
  const errMsg = Array.isArray(error) ? error.pop() : error;
  const err = errMsg && (
    <span className="Field__error">
      {errMsg}
    </span>
  );
  const warnMsg = !errMsg && Array.isArray(warning) ? warning.pop() : warning;
  const warn = warnMsg && (
    <span className="Field__warning">
      {warnMsg}
    </span>
  );

  return (
    <div className={`Field__messages ${bottom ? 'Field__messages--bottom' : ''}`}>
      {err}
      {warn}
    </div>
  );
};

Messages.propTypes = MessagesProps;
Messages.defaultProps = MessagesDefaultProps;

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
      input: { value },
      meta: { touched },
      storeKey,
      type,
    } = props;

    if (!['password', 'hidden'].includes(type) && (touched || nextValue !== value)) {
      sessionStorage.setItem(storeKey, nextValue || '');
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
      input: { value },
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
      : value || initialValue || sessionStorage.getItem(storeKey);

    let nextValue = currentValue;
    if (type === 'checkbox') {
      const boolNormalized = Literal.fromBoolean(currentValue);
      nextValue = boolNormalized && boolNormalized.value === '1';
    } else if (type === 'textarea') {
      nextValue = currentValue && Object.prototype.hasOwnProperty.call(currentValue, 'termType')
        ? currentValue.value
        : currentValue;
    }

    return nextValue || '';
  }

  description() {
    return this.props.description && (
      <div className="Field__description">{this.props.description}</div>
    );
  }

  inputElement() {
    const {
      autoComplete,
      autofocus,
      field,
      forwardedRef,
      initialValue,
      input,
      id,
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

    const className = `Field__input Field__input--${type || 'text'}`;

    const sharedProps = {
      autoFocus: autofocus,
      className,
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
          onChange={e => this.saveInputValue(e)}
        />
      );
    }

    if (type === 'select') {
      return (
        <SelectInput
          initialSelectedItem={initialValue}
          options={options}
          sharedProps={sharedProps}
          value={this.inputValue()}
        />
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

    return (
      <Input
        {...sharedProps}
        autoComplete={autoComplete}
        element={element}
        // TODO: [AOD-218] HTML only noscript
        // maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        ref={forwardedRef}
        required={required}
        type={type}
        value={this.inputValue()}
        onKeyUp={onKeyUp}
      />
    );
  }

  label(label) {
    const { id, theme } = this.props;

    if (label) {
      return (
        <label
          className={`Field__label${theme === 'omniform' ? ' AriaHidden' : ''}`}
          htmlFor={id || this.plainFieldName()}
        >
          {label}
        </label>
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
      label,
      type,
    } = this.props;

    const {
      active,
      dirty,
      error,
      invalid,
      touched,
    } = this.props.meta;
    const allErrs = customErrors || error;
    const warning = error;
    const variant = this.variant();

    const classes = classNames({
      Field: true,
      [`Field--variant-${variant}`]: variant,
      'Field--active': active,
      'Field--dirty': dirty,
      'Field--error': !!allErrs,
      'Field--hidden': (type === 'hidden'),
      'Field--textarea': (type === 'textarea'),
      'Field--warning': invalid,
      className,
    });

    const renderMessages = touched && (allErrs || warning);

    const messagesAboveLabel = (variant !== 'material');

    return (
      <div className={`Field ${className} ${classes}`}>
        {renderMessages && messagesAboveLabel && <Messages error={allErrs} warning={warning} />}
        {this.label(label)}
        {this.description()}
        {this.inputElement()}
        {renderMessages && !messagesAboveLabel && (
          <Messages bottom error={allErrs} warning={warning} />
        )}
      </div>
    );
  }
}

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

const FieldWrapper = (props) => {
  const namePrefix = React.useContext(FormSectionContext);
  const name = namePrefix ? `${namePrefix}.${props.field}` : props.field;

  return (
    <Field
      name={name}
      validate={props.validate}
    >
      {formProps => (
        <FormField
          {...props}
          {...formProps}
        />
      )}
    </Field>
  );
};

FieldWrapper.propTypes = propTypes;

export default FieldWrapper;
