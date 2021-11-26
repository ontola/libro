import { NamedNode } from '@ontologies/core';

import useFormField, {
  ForbiddenFormField,
  PermittedFormField,
  UseFormFieldProps,
} from './useFormField';
import useInputId from './useInputId';

export const useFormFieldForPath = (path: NamedNode, options: UseFormFieldProps = {}): PermittedFormField | ForbiddenFormField => {
  const field = useInputId(path);

  return useFormField(field, options);
};
