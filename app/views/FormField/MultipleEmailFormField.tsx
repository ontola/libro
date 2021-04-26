import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import { MultipleEmailInput } from '../../components/Input/MultipleEmailInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const MultipleEmailFormField: FC = (props) => {
  const fieldProps = useFormField({
    delay: false,
    preferPlaceholder: true,
    ...props,
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

MultipleEmailFormField.topology = allTopologies;

export default register(MultipleEmailFormField);
