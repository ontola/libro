import { NamedNode, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React, { FunctionComponent } from 'react';

import { ResolvedShapeForm } from '../../hooks/useFieldShape';
import { JSONLDObject } from '../../lib/helpers';

export type InputValue = JSONLDObject | SomeTerm;
export type OnInputChange = (newValues: InputValue[]) => void;
export type FocusRelatedEventHandler = (e: React.FocusEvent<HTMLElement>) => void;
export type ItemFactory = () => InputValue;

export interface FormFieldError {
  index?: number;
  error: string;
}

export interface SubmissionErrors {
  [key: string]: FormFieldError[];
}

interface InputMeta {
  active?: boolean;
  dirty?: boolean;
  dirtySinceLastSubmit?: boolean;
  error?: FormFieldError[];
  invalid?: boolean;
  pristine?: boolean;
  touched?: boolean;
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
  removeItem: (index: number) => void;
  sortable?: boolean;
  path?: NamedNode;
  placeholder?: string;
  storeKey?: string;
  values: InputValue[];
  whitelisted?: true;
}

export type FormField = PermittedFormField | ForbiddenFormField;

export type InputChangeHandler = (newValue: InputValue) => void;

export interface InputComponentProps {
  autofocus: boolean;
  errors: FormFieldError[];
  inputIndex: number;
  inputValue: InputValue;
  onChange: InputChangeHandler;
}

interface CombinedFormFieldProps extends PermittedFormField {
  combinedComponent: true;
  inputComponent: FunctionComponent;
}

interface SingularFormFieldProps extends PermittedFormField {
  combinedComponent: false | undefined;
  inputComponent: FunctionComponent<InputComponentProps>;
}

export type FormFieldProps = CombinedFormFieldProps | SingularFormFieldProps;
