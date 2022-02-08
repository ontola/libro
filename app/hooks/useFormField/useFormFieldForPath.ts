import { NamedNode } from '@ontologies/core';

import useInputId from '../useInputId';

import {
  ForbiddenFormField,
  PermittedFormField,
  UseFormFieldProps,
} from './types';
import { useFormField } from './useFormField';

export const useFormFieldForPath = (path: NamedNode, options: UseFormFieldProps = {}): PermittedFormField | ForbiddenFormField => {
  const field = useInputId(path);

  return useFormField(field, options);
};
