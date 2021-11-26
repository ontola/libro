import { FC, register } from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import { MultipleEmailInput } from '../../components/Input/MultipleEmailInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';

const MultipleEmailFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject, {
    delay: false,
  });

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      combinedComponent
      {...fieldProps}
      inputComponent={MultipleEmailInput}
    />
  );
};

MultipleEmailFormField.type = form.MultipleEmailInput;

MultipleEmailFormField.topology = formFieldTopologies;

export default register(MultipleEmailFormField);
