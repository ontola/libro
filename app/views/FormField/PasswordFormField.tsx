import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import { InputComponentProps } from '../../components/FormField/InputComponentProps';
import { InputType } from '../../components/Input/Input';
import InputElement from '../../components/Input/InputElement';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

const PasswordInput = (fieldProps: InputComponentProps) => (
  <InputElement
    {...fieldProps}
    type={InputType.Password}
  />
);

const PasswordFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject, {
    delay: true,
    storage: false,
  });

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={PasswordInput}
    />
  );
};

PasswordFormField.type = form.PasswordInput;

PasswordFormField.topology = formFieldTopologies;

export default register(PasswordFormField);
