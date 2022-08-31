import { NamedNode } from '@ontologies/core';
import React from 'react';

import { formContext } from '../components/Form/FormContext';
import { FormField } from '../components/FormField/FormFieldTypes';

import useFormField, { UseFormFieldProps } from './useFormField';
import useInputId from './useInputId';

export const useFormFieldForPath = (path: NamedNode, options: UseFormFieldProps = {}): FormField => {
  const { formIRI } = React.useContext(formContext);
  const field = useInputId(formIRI, path);

  return useFormField(field, options);
};
