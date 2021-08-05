import { SomeNode } from 'link-lib';
import React, { EventHandler } from 'react';

import { InputValue } from '../../hooks/useFormField';
import { ShapeForm } from '../../hooks/useShapeProps';

import { FormFieldError, InputMeta } from './';

export interface InputComponentProps {
  autofocus: boolean;
  description?: string;
  errors: FormFieldError[];
  field: SomeNode;
  fieldShape: ShapeForm;
  id: string;
  inputIndex: number;
  inputValue: InputValue;
  label?: string | React.ReactNode;
  meta: InputMeta;
  name: string;
  onChange: EventHandler<any>;
  path: SomeNode;
  placeholder?: string;
  storeKey: string;
  values: InputValue[];
}
