import { register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import InputElement from '../../components/Input/InputElement';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const PasswordInput = (fieldProps) => <InputElement {...fieldProps} type="password" />;

const PasswordFormField = (props) => {
  const fieldProps = useFormField({
    delay: true,
    storage: false,
    ...props,
  });

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
