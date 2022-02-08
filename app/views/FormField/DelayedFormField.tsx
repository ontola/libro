import { SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import InputElement from '../../components/Input/InputElement';
import { useFormField } from '../../hooks/useFormField';
import form from '../../ontology/form';

const getInputType = (type: SomeTerm) => {
  if (type === form.ColorInput) {
    return 'color';
  }

  if (type === form.NumberInput) {
    return 'number';
  }

  return 'text';
};

const DelayedFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject, {
    delay: true,
  });

  const [type] = useProperty(rdfx.type);
  const DelayedInput = React.useCallback((inputProps) => (
    <InputElement
      {...inputProps}
      type={getInputType(type)}
    />
  ), [type]);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={DelayedInput}
    />
  );
};

DelayedFormField.type = [
  form.ColorInput,
  form.NumberInput,
];

DelayedFormField.topology = formFieldTopologies;

export default register(DelayedFormField);
