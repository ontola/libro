import { SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import {
 FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import InputElement from '../../components/Input/InputElement';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const getInputType = (type: SomeTerm) => {
  if (type === form.ColorInput) {
    return 'color';
  }
  if (type === form.NumberInput) {
    return 'number';
  }

  return 'text';
};

const DelayedFormField: FC = (props) => {
  const fieldProps = useFormField({
    delay: true,
    ...props,
  });

  const [type] = useProperty(rdfx.type);
  const DelayedInput = React.useCallback((inputProps) => (
    <InputElement {...inputProps} type={getInputType(type)} />
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

DelayedFormField.topology = allTopologies;

export default register(DelayedFormField);
