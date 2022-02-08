import { NamedNode, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';

import { FormFieldError, InputMeta } from '../../components/FormField';
import { JSONLDObject } from '../../helpers/forms';
import { ResolvedShapeForm } from '../useShapeProps';

export type InputValue = JSONLDObject | SomeTerm;
export type OnInputChange = (newValues: InputValue[]) => void;
export type FocusRelatedEventHandler = (e?: React.FocusEvent<HTMLElement>) => void;
export type ItemFactory = () => InputValue;

export interface UseFormFieldProps {
  alwaysVisible?: boolean;
  delay?: boolean;
  newItem?: ItemFactory;
  storage?: boolean;
}

export interface ForbiddenFormField {
  field?: SomeNode;
  fieldShape: Record<string, never>;
  name: string;
  onChange: OnInputChange;
  values: InputValue[];
  whitelisted: false;
}

export interface PermittedFormField {
  addFormValue?: () => any;
  autofocus?: boolean;
  className?: string;
  description?: string;
  field?: SomeNode;
  fieldShape: ResolvedShapeForm;
  helperText?: string | null;
  inputErrors: FormFieldError[];
  label?: string | React.ReactNode;
  meta: InputMeta;
  name: string;
  onBlur: FocusRelatedEventHandler;
  onChange: OnInputChange;
  onFocus: FocusRelatedEventHandler;
  path?: NamedNode;
  placeholder?: string;
  storeKey?: string;
  values: InputValue[];
  whitelisted?: true;
}
