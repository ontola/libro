import { FC, register } from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import SliderInput from '../../components/Input/SliderInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';

const SliderFormField: FC = (props) => {
  const fieldProps = useFormField({
    delay: true,
    ...props,
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
