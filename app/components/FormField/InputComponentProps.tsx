import { SomeNode } from 'link-lib';
import React, { EventHandler } from 'react';

import { FocusRelatedEventHandler, InputValue } from '../../hooks/useFormField';
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
  onBlur: FocusRelatedEventHandler;
  onChange: EventHandler<any>;
  onFocus: FocusRelatedEventHandler;
  path: SomeNode;
  placeholder?: string;
  storeKey: string;
  values: InputValue[];
}
