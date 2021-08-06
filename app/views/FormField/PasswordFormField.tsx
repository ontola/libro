import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import { InputComponentProps } from '../../components/FormField/InputComponentProps';
import { InputType } from '../../components/Input/Input';
import InputElement from '../../components/Input/InputElement';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const PasswordInput = (fieldProps: InputComponentProps) => (
  <InputElement
    {...fieldProps}
    type={InputType.Password}
  />
);

const PasswordFormField: FC = (props) => {
  const fieldProps = useFormField({
    delay: true,
    storage: false,
    ...props,
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

PasswordFormField.topology = allTopologies;

export default register(PasswordFormField);
