import classNames from 'classnames';
import { asField } from 'informed';
import PropTypes from 'prop-types';
import { Literal, NamedNode } from 'rdflib';
import React from 'react';
import Textarea from 'react-textarea-autosize';
import DateTimePicker from 'react-datetime-picker';

import TextEditor from '../../containers/TextEditor';
import { NS } from '../../helpers/LinkedRenderStore';
import FileInput from '../Input/FileInput';
import { Input } from '../Input';
import SelectInput from '../SelectInput';

import './DateTime.scss';
import './FormField.scss';

const propTypes = {
  autoComplete: PropTypes.string,
  autofocus: PropTypes.bool,
  // Preferably use variants to style this component.
  className: PropTypes.string,
  // Unique identifier. Used to link label to input.
  field: PropTypes.string.isRequired,
  /** @private */
  fieldApi: PropTypes.shape({
    setTouched: PropTypes.func,
    setValue: PropTypes.func,
  }),
  /** @private Contains data from informed */
  fieldState: PropTypes.shape({
    error: PropTypes.arrayOf(PropTypes.string),
    touched: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Literal),
      PropTypes.instanceOf(NamedNode),
    ]),
  }),
  /** @private */
  forwardedRef: PropTypes.shape({ value: PropTypes.instanceOf(HTMLInputElement) }),
  /** Ensure that it matches the label `for` attribute */
  id: PropTypes.string,
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  // Text above input field
  label: PropTypes.string,
  minLength: PropTypes.number,
  // Minimal number of rows for textAreas
  minRows: PropTypes.number,
  // Name of the input, defaults to the field name
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
  })),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  theme: PropTypes.string,
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
class FormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
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
      fieldApi,
      forwardedRef,
      initialValue,
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

    const fieldTxt = field && atob(field);

    const className = `Field__input Field__input--${type || 'text'}`;

    const sharedProps = {
      autoFocus: autofocus,
      className,
      id: id || fieldTxt,
      name: name || fieldTxt,
      onBlur: (e) => {
        fieldApi.setTouched();
        this.setState({
          active: false,
        });
        if (onBlur) {
          onBlur(e);
        }
      },
      onChange: (e) => {
        fieldApi.setValue(type === 'checkbox' ? e.target.checked : e.target.value);
        if (onChange) {
          onChange(e);
        }
        return undefined;
      },
      onFocus: () => {
        this.setState({
          active: true,
        });
      },
      required,
    };

    if (type === 'datetime-local') {
      return (
        <DateTimePicker
          value={this.inputValue()}
          onChange={e => fieldApi.setValue(e)}
        />
      );
    }

    if (type === 'select') {
      return (
        <SelectInput
          initialHighlightedIndex={options.indexOf(initialValue)}
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
              fieldApi.setValue(undefined);
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
                fieldApi.setValue(enc);
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
        break;
      case 'markdown':
        element = TextEditor;
        break;
      default:
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
        minRows={minRows}
        placeholder={placeholder}
        ref={forwardedRef}
        required={required}
        type={type}
        value={this.inputValue()}
        onKeyUp={onKeyUp}
      />
    );
  }

  inputValue() {
    const { fieldState: { touched, value }, initialValue, type } = this.props;

    if (type === 'file') {
      return undefined;
    }

    const currentValue = !touched && !value && value !== 0 ? initialValue || '' : value;

    if (type === 'checkbox') {
      const boolNormalized = Literal.fromBoolean(currentValue);
      return boolNormalized && boolNormalized.value === '1';
    }

    return currentValue;
  }

  label(label) {
    const { field, id, theme } = this.props;

    if (label && theme !== 'omniform') {
      return (
        <label
          className="Field__label"
          htmlFor={id || (field && atob(field))}
        >
          {label}
        </label>
      );
    }

    return null;
  }

  variant() {
    return this.props.theme === 'omniform' ? 'preview' : this.props.variant;
  }

  render() {
    const {
      className,
      label,
      type,
    } = this.props;

    const { active } = this.state;
    const { error, touched, value } = this.props.fieldState;
    const warning = error;
    const variant = this.variant();

    const classes = classNames({
      Field: true,
      [`Field--variant-${variant}`]: variant,
      'Field--active': active,
      'Field--dirty': touched && value,
      'Field--error': error,
      'Field--hidden': (type === 'hidden'),
      'Field--textarea': (type === 'textarea'),
      'Field--warning': warning,
      className,
    });

    const renderMessages = touched && (error || warning);

    const messagesAboveLabel = (variant !== 'material');

    return (
      <div className={`Field ${className} ${classes}`}>
        {renderMessages && messagesAboveLabel && <Messages error={error} warning={warning} />}
        {this.label(label)}
        {this.description()}
        {this.inputElement()}
        {renderMessages && !messagesAboveLabel && (
          <Messages bottom error={error} warning={warning} />
        )}
      </div>
    );
  }
}

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default asField(FormField);
