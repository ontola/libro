import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import SliderInput from '../../components/Input/SliderInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

const SliderFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject, {
    delay: true,
  });

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={SliderInput}
    />
  );
};

SliderFormField.type = [
  form.SliderInput,
];

SliderFormField.topology = formFieldTopologies;

export default register(SliderFormField);
