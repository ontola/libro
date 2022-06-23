import { SomeTerm } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React, { FunctionComponent } from 'react';

import { InputComponentProps } from '../../components/FormField/FormFieldTypes';
import { InputType } from '../../components/Input/Input';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../../../topologies';
import { FormTheme, formContext } from '../../components/Form/FormContext';
import FormField from '../../components/FormField/FormField';
import InputElement from '../../components/Input/InputElement';
import useFormField from '../../hooks/useFormField';

const getInputType = (theme: FormTheme | undefined, type: SomeTerm): InputType => {
  if (type === form.EmailInput) {
    return InputType.Email;
  }

  if (type === form.TextAreaInput) {
    return InputType.Textarea;
  }

  if (type === form.MarkdownInput) {
    return theme === FormTheme.Preview ? InputType.Textarea : InputType.Markdown;
  }

  return InputType.Text;
};

const TextFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject, {
    delay: true,
  });
  const { theme } = React.useContext(formContext);
  const [type] = useProperty(rdfx.type);
  const TextInput = React.useCallback<FunctionComponent<InputComponentProps>>((inputProps) => (
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
