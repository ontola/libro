import React, { EventHandler } from 'react';

import { isString } from '../../helpers/types';
import { FocusRelatedEventHandler } from '../../hooks/useFormField';

import './Input.scss';

export enum InputMode {
  Decimal = 'decimal',
  Email = 'email',
  None = 'none',
  Number = 'number',
  Numeric = 'numeric',
  Search = 'search',
  Tel = 'tel',
  Url = 'url',
}

export enum InputType {
  Button = 'button',
  Checkbox = 'checkbox',
  Color = 'color',
  Date = 'date',
  Datetime = 'datetime-local',
  Email = 'email',
  File = 'file',
  Hidden = 'hidden',
  Image = 'image',
  Markdown = 'markdown',
  Month = 'month',
  Number = 'number',
  Password = 'password',
  Radio = 'radio',
  Range = 'range',
  Reset = 'reset',
  Search = 'search',
  Submit = 'submit',
  Tel = 'tel',
  Text = 'text',
  Textarea = 'textarea',
  Time = 'time',
  Url = 'url',
  Week = 'week',
}

export interface PropTypes {
  autoFocus?: boolean;
  capture?: string | boolean;
  checked?: boolean;
  className?: string;
  'data-testid'?: string;
  element?: any;
  hiddenValue?: string;
  id?: string;
  inputMode?: InputMode;
  max?: number;
  min?: number;
  minLength?: number;
  name: string;
  onBlur?: FocusRelatedEventHandler;
  onChange?: EventHandler<any>;
  onFocus?: FocusRelatedEventHandler;
  onKeyUp?: EventHandler<any>;
  placeholder?: string;
  required?: boolean;
  spellCheck?: boolean | 'true' | 'false';
  type?: InputType;
  value?: boolean | string | number;
}

const defaultProps = {
  element: 'input',
};

const Input: React.FC<PropTypes> = ({
  element,
  className,
  value,
  ...props
}) => {
  const Element = element;

  const inputRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (props.autoFocus && inputRef.current && isString(element)) {
      inputRef.current.focus();
    }
  }, [props.autoFocus, inputRef.current]);

  return (
    <Element
      className={`Input ${className ?? ''}`}
      ref={inputRef}
      value={value ?? ''}
      {...props}
    />
  );
};

Input.defaultProps = defaultProps;

export default Input;
