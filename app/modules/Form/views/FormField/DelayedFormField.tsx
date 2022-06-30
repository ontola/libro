import { SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React, { FunctionComponent } from 'react';

import FormField from '../../components/FormField/FormField';
import { InputComponentProps } from '../../components/FormField/FormFieldTypes';
import { InputType } from '../../components/Input/Input';
import InputElement from '../../components/Input/InputElement';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

const getInputType = (type: SomeTerm): InputType => {
  if (type === form.ColorInput) {
    return InputType.Color;
  }

  if (type === form.NumberInput) {
    return InputType.Number;
  }

  return InputType.Text;
};

const DelayedFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject, {
    delay: true,
  });

  const [type] = useProperty(rdfx.type);
  const DelayedInput = React.useCallback<FunctionComponent<InputComponentProps>>((inputProps) => (
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
