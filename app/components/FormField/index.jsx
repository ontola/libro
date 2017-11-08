import classNames from 'classnames';
import React, { PropTypes } from 'react';

import './FormField.scss';

const propTypes = {
  autoComplete: PropTypes.string,
  // Preferably use variants to style this component.
  className: PropTypes.string,
  // E.g. 'input' or 'textArea'
  element: PropTypes.string.isRequired,
  // Unique identifier. Used to link label to input.
  id: PropTypes.string.isRequired,
  // Contains data from redux-form, such as values
  input: PropTypes.shape({
    values: PropTypes.arrayOf(PropTypes.string),
  }),
  // Text above input field
  label: PropTypes.string,
  // Generated by Redux-form. Contains value and error data.
  // http://redux-form.com/6.4.3/docs/api/Field.md/
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
    error: PropTypes.string,
    touched: PropTypes.bool,
    warning: PropTypes.string,
  }),
  placeholder: PropTypes.string,
  // Number of rows for textAreas
  rows: PropTypes.number,
  // HTML input type, e.g. 'email'
  type: PropTypes.string,
  // Modify te look and feel of the FormField
  variant: PropTypes.oneOf(['material', 'preview']),
};

const defaultProps = {
  autoComplete: 'false',
  meta: {},
  variant: 'default',
};

/**
 * Creates a field for forms. Use with redux-form Field if possible.
 * @returns {component} Component
 */
const FormField = ({
  autoComplete,
  className,
  rows,
  placeholder,
  input,
  element,
  label,
  type,
  id,
  variant,
  meta: {
    active,
    dirty,
    error,
    touched,
    warning,
  },
}) => {
  const Element = element;

  const classes = classNames({
    Field: true,
    [`Field--variant-${variant}`]: variant,
    'Field--active': active,
    'Field--dirty': dirty,
    'Field--textarea': (type === 'textarea'),
    className,
  });

  return (
    <div className={`Field ${className} ${classes}`}>
      {label &&
        <label
          className="Field__label"
          htmlFor={id}
        >
          {label}
        </label>
      }
      <Element
        {...input}
        autoComplete={autoComplete}
        className="Field__input"
        id={id}
        placeholder={placeholder}
        rows={rows}
        type={type}
      />
      {touched && (error || warning) &&
        <div className="Field__messages">
          {((error &&
            <span className="Field__error">
              {error}
            </span>
          ) || (warning &&
            <span className="Field__warning">
              {warning}
            </span>
          ))}
        </div>
      }
    </div>
  );
};

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default FormField;
