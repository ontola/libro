import clsx from 'clsx';
import { SomeNode } from 'link-lib';
import React, { ChangeEvent, EventHandler } from 'react';
import Textarea from 'react-autosize-textarea';

import RichTextEditor, { RichTextEditorWrapperProps } from '../../containers/RichTextEditor';
import { isHTMLInputEvent } from '../../helpers/types';
import { InputValue } from '../../hooks/useFormField';
import { ShapeForm } from '../../hooks/useShapeProps';
import { FormContext } from '../Form/Form';
import { FormFieldError, InputMeta } from '../FormField';
import FormFieldTrailer from '../FormField/FormFieldTrailer';
import Input, {
  InputAutocomplete ,
  InputProps as InputProps,
  InputType,
} from '../Input/Input';

const TEXTFIELD_MIN_ROWS = 3;
const MAX_STR_LEN = 255;

export interface InputElementProps {
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
  onChange: (v: unknown) => void;
  path: SomeNode;
  placeholder?: string;
  required?: boolean;
  storeKey: string;
  trailer: (props: any) => any;
  type?: InputType;
}

type CombinedInputProps = InputProps
  & Partial<RichTextEditorWrapperProps>
  & Partial<Omit<Textarea.Props, keyof InputProps>>;

const InputElement = (props: InputElementProps): JSX.Element => {
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

  const className = clsx({
    'Field__input': true,
    [`Field__input--${type || 'text'}`]: true,
    'Field__input--active': active,
  });

  const sharedProps: CombinedInputProps = {
    'autoFocus': autofocus,
    'data-testid': name,
    id: name,
    name,
    onChange: (e: React.ChangeEvent<HTMLInputElement | string>) => {
      let val;
      if (isHTMLInputEvent(e)) {
        val = type === 'checkbox' ? e.target.checked : e.target.value;
      } else {
        val = e === null ? '' : e;
      }
      onChange(val);
    },
    required,
    value: inputValue?.value,
  };

  const minRows = maxLength && maxLength > MAX_STR_LEN ? TEXTFIELD_MIN_ROWS : undefined;

  let element;
  switch (type) {
  case 'textarea':
    element = Textarea;
    sharedProps.async = true;
    sharedProps.rows = minRows;
    sharedProps.maxRows = 50;
    break;
  case 'markdown':
    element = RichTextEditor;
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
