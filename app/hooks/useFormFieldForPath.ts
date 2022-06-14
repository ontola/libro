import { NamedNode } from '@ontologies/core';

import { FormField } from '../components/FormField/FormFieldTypes';

import useFormField, { UseFormFieldProps } from './useFormField';
import useInputId from './useInputId';

export const useFormFieldForPath = (path: NamedNode, options: UseFormFieldProps = {}): FormField => {
  const field = useInputId(path);

  return useFormField(field, options);
};
