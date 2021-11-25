import { EventHandler } from 'react';

import { InputValue } from '../../hooks/useFormField';

import { FormFieldError } from './';

export interface InputComponentProps {
  autofocus: boolean;
  errors: FormFieldError[];
  inputIndex: number;
  inputValue: InputValue;
  onChange: EventHandler<any>;
}
