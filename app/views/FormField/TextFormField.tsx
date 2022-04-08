import { SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { FormTheme, formContext } from '../../components/Form/FormContext';
import FormField from '../../components/FormField/FormField';
import InputElement from '../../components/Input/InputElement';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

const getInputType = (theme: FormTheme | undefined, type: SomeTerm) => {
  if (type === form.EmailInput) {
    return 'email';
  }

  if (type === form.TextAreaInput) {
    return 'textarea';
  }

  if (type === form.MarkdownInput) {
    return theme === FormTheme.Preview ? 'textarea' : 'markdown';
  }

  return 'text';
};

const TextFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject, {
    delay: true,
  });
  const { theme } = React.useContext(formContext);
  const [type] = useProperty(rdfx.type);
  const TextInput = React.useCallback((inputProps) => (
    <InputElement
      {...inputProps}
      type={getInputType(theme, type)}
    />
  ), [type]);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={TextInput}
    />
  );
};

TextFormField.type = [
  form.EmailInput,
  form.TextAreaInput,
  form.TextInput,
  form.MarkdownInput,
];

TextFormField.topology = formFieldTopologies;

export default register(TextFormField);
