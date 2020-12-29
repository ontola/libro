import { SomeTerm } from '@ontologies/core';
import classNames from 'classnames';
import { SomeNode } from 'link-lib';
import PropTypes from 'prop-types';
import React from 'react';
import Textarea from 'react-autosize-textarea';

import TextEditor from '../../containers/TextEditor';
import { ShapeForm } from '../../hooks/useShapeProps';
import { FormContext } from '../Form/Form';
import { InputMeta } from '../FormField';
import FormFieldTrailer from '../FormField/FormFieldTrailer';

import Input from './Input';

const TEXTFIELD_MIN_ROWS = 3;
const MAX_STR_LEN = 255;

interface InputProps {
  [key: string]: any;
}

interface PropTypes {
  autoComplete: string;
  autofocus: boolean;
  className: string;
  description: string;
  errors: string[];
  field: SomeNode;
  fieldShape: ShapeForm;
  id: string;
  inputIndex: number;
  inputValue: SomeTerm;
  label: string | React.ReactNode;
  meta: InputMeta;
  minRows: number;
  name: string;
  onBlur: (props: any) => any;
  onChange: (props: any) => any;
  path: SomeNode;
  placeholder: string;
  propertyIndex: number;
  storeKey: string;
  trailer: (props: any) => any;
  type: string;
}

const InputElement = (props: PropTypes) => {
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
        value={inputValue?.value}
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
