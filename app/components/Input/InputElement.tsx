import classNames from 'classnames';
import { SomeNode } from 'link-lib';
import React from 'react';
import Textarea from 'react-autosize-textarea';

import TextEditor from '../../containers/TextEditor';
import { InputValue } from '../../hooks/useFormField';
import { ShapeForm } from '../../hooks/useShapeProps';
import { FormContext } from '../Form/Form';
import { FormFieldError, InputMeta } from '../FormField';
import FormFieldTrailer from '../FormField/FormFieldTrailer';

import Input, { InputAutocomplete, InputType } from './Input';

const TEXTFIELD_MIN_ROWS = 3;
const MAX_STR_LEN = 255;

interface InputProps {
  [key: string]: any;
}

export interface InputPropTypes {
  autoComplete?: InputAutocomplete;
  autofocus: boolean;
  description?: string;
  errors?: FormFieldError[];
  field: SomeNode;
  fieldShape: ShapeForm;
  id: string;
  inputIndex: number;
  inputValue: InputValue;
  label?: string | React.ReactNode;
  meta: InputMeta;
  name: string;
  onChange: (props: any) => void;
  path: SomeNode;
  placeholder?: string;
  required?: boolean;
  storeKey: string;
  trailer: (props: any) => any;
  type?: InputType;
}

const InputElement = (props: InputPropTypes) => {
  const {
    autoComplete,
    autofocus,
    fieldShape,
    inputValue,
    meta,
    name,
    onChange,
    placeholder,
    storeKey,
    trailer: Trailer,
    type,
  } = props;
  const {
    onKeyUp,
  } = React.useContext(FormContext);
  const {
    maxLength,
    minLength,
    required,
  } = fieldShape;
  const {
    active,
  } = meta;

  const className = classNames({
    'Field__input': true,
    [`Field__input--${type || 'text'}`]: true,
    'Field__input--active': active,
  });

  const sharedProps = {
    'autoFocus': autofocus,
    'data-testid': name,
    'id': name,
    name,
    'onChange': (e: React.ChangeEvent<HTMLInputElement>) => {
      let val;
      if (e && Object.prototype.hasOwnProperty.call(e, 'target')) {
        val = type === 'checkbox' ? e.target.checked : e.target.value;
      } else {
        val = e === null ? '' : e;
      }
      onChange(val);
    },
    required,
    'value': inputValue?.value,
  } as InputProps;

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
      sharedProps.checked = currentValue.value === 'true';
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
        onKeyUp={onKeyUp}
      />
      {Trailer && <Trailer {...props} />}
    </div>
  );
};

InputElement.defaultProps = {
  trailer: FormFieldTrailer,
};

export default InputElement;
