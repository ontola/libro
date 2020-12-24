import { register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import SliderInput from '../../components/Input/SliderInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const SliderFormField = (props) => {
  const fieldProps = useFormField({
    delay: true,
    ...props,
  });

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

SliderFormField.topology = allTopologies;

export default register(SliderFormField);
