import classNames from 'classnames';
import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Textarea from 'react-autosize-textarea';

import TextEditor from '../../containers/TextEditor';
import { fieldShapeType } from '../../hooks/useFormField';
import FormFieldTrailer from '../FormField/FormFieldTrailer';
import { formFieldError } from '../FormField';

import Input from './Input';

const TEXTFIELD_MIN_ROWS = 3;
const MAX_STR_LEN = 255;

const InputElement = (props) => {
  const {
    autoComplete,
    autofocus,
    fieldShape,
    inputValue,
    meta,
    name,
    onChange,
    onKeyUp,
    placeholder,
    storeKey,
    trailer: Trailer,
    type,
  } = props;
  const {
    maxLength,
    minLength,
    required,
  } = fieldShape;
  const {
    active,
  } = meta;

  const className = classNames({
    Field__input: true,
    [`Field__input--${type || 'text'}`]: true,
    'Field__input--active': active,
  });

  const sharedProps = {
    autoFocus: autofocus,
    'data-testid': name,
    id: name,
    name,
    onChange: (e) => {
      let val;
      if (e && Object.prototype.hasOwnProperty.call(e, 'target')) {
        val = type === 'checkbox' ? e.target.checked : e.target.value;
      } else {
        val = e === null ? '' : e;
      }
      onChange(val);
    },
    required,
    value: inputValue?.value,
  };

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
      {Trailer && <Trailer {...props} />}
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
  field: linkType,
  fieldShape: fieldShapeType,
  formIRI: linkType,
  /** Ensure that it matches the label `for` attribute */
  id: PropTypes.string,
  inputIndex: PropTypes.number,
  inputValue: linkType,
  // Text above input field
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  /** @private Contains form-library specific data */
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
    error: PropTypes.arrayOf(formFieldError),
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    touched: PropTypes.bool,
  }),
  // Minimal number of rows for textAreas
  minRows: PropTypes.number,
  name: PropTypes.string,
  object: linkType,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  path: linkType,
  placeholder: PropTypes.string,
  propertyIndex: PropTypes.number,
  storeKey: PropTypes.string,
  submissionErrors: PropTypes.objectOf(PropTypes.arrayOf(formFieldError)),
  theme: PropTypes.string,
  trailer: PropTypes.func,
  // HTML input type, e.g. 'email'
  type: PropTypes.string,
  // Modify te look and feel of the FormField
  variant: PropTypes.oneOf([
    'default',
    'material',
    'preview',
  ]),
};

InputElement.defaultProps = {
  trailer: FormFieldTrailer,
};

export default InputElement;
