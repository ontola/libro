import { FC, register } from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { formFieldTopologies } from '../../../../topologies';
import FormField from '../../components/FormField/FormField';
import { MultipleEmailInput } from '../../components/Input/MultipleEmailInput';
import useFormField from '../../hooks/useFormField';

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
