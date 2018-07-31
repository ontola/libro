import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Literal } from 'rdflib';
import React from 'react';
import { asField } from 'informed';

import './FormField.scss';
import TextEditor from '../TextEditor';
import { NS } from '../../helpers/LinkedRenderStore';
import { Input } from '../Input';

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
    error: PropTypes.bool,
    touched: PropTypes.bool,
    value: PropTypes.string,
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
  // Enables the rich (markdown) text editor
  rich: PropTypes.bool,
  // Number of rows for textAreas
  rows: PropTypes.number,
  theme: PropTypes.string,
  // HTML input type, e.g. 'email'
  type: PropTypes.string,
  // Modify te look and feel of the FormField
  variant: PropTypes.oneOf(['material', 'preview']),
};

const defaultProps = {
  autofocus: false,
  rich: false,
  variant: 'default',
};

const MessagesProps = {
  bottom: PropTypes.bool,
  error: PropTypes.string,
  warning: PropTypes.string,
};

const MessagesDefaultProps = {
  bottom: false,
};

const Messages = ({ error, warning, bottom }) => {
  const err = error && (
    <span className="Field__error">
      {error}
    </span>
  );
  const warn = (!error && warning) && (
    <span className="Field__warning">
      {warning}
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
      reader.result.slice(reader.result.indexOf('base64,') + 'base64,'.length),
      NS.xsd('base64Binary')
    ));
    reader.onerror = error => reject(error);
  });
}

/**
 * Creates a field for forms. Use with redux-form Field if possible.
 * @returns {component} Component
 */
class FormField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  inputElement() {
    const {
      autoComplete,
      autofocus,
      field,
      fieldApi,
      forwardedRef,
      id,
      initialValue,
      minLength,
      name,
      onBlur,
      onChange,
      onKeyUp,
      options,
      placeholder,
      required,
      rich,
      rows,
      type,
    } = this.props;

    const { touched, value } = this.props.fieldState;

    if (type === 'select') {
      return (
        <select
          className={`Field__input Field__input--${type || 'text'}`}
          id={id}
          required={required}
          onBlur={(e) => {
            fieldApi.setTouched();
            this.setState({
              active: false,
            });
            if (onBlur) {
              onBlur(e);
            }
          }}
          onChange={(e) => {
            fieldApi.setValue(e.target.value);
            if (onChange) {
              onChange(e);
            }
          }}
          onFocus={() => {
            this.setState({
              active: true,
            });
          }}
        >
          {options.map(o => <option key={o.value} value={o.value}>{o.value}</option>)}
        </select>
      );
    }

    let element;
    switch (type) {
      case 'textarea':
        element = rich ? TextEditor : 'textarea';
        break;
      default:
        element = 'input';
    }

    const fieldTxt = field && atob(field);
    return (
      <Input
        autoComplete={autoComplete}
        autoFocus={autofocus}
        className={`Field__input Field__input--${type || 'text'}`}
        element={element}
        id={id || fieldTxt}
        // TODO: [AOD-218] HTML only noscript
        // maxLength={maxLength}
        minLength={minLength}
        name={name || fieldTxt}
        placeholder={placeholder}
        ref={forwardedRef}
        required={required}
        rows={rows}
        type={type}
        value={!touched && !value && value !== 0 ? initialValue || '' : value}
        onBlur={(e) => {
          fieldApi.setTouched();
          this.setState({
            active: false,
          });
          if (onBlur) {
            onBlur(e);
          }
        }}
        onChange={(e) => {
          if (type === 'file') {
            return new Promise(() => getBase64(e.target.files[0])
              .then((enc) => {
                fieldApi.setValue(enc);
                if (onChange) {
                  onChange(enc, e);
                }
              }));
          }
          fieldApi.setValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
          return undefined;
        }}
        onFocus={() => {
          this.setState({
            active: true,
          });
        }}
        onKeyUp={onKeyUp}
      />
    );
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
