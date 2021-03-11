import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import SliderInput from '../../components/Input/SliderInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const SliderFormField: FC = (props) => {
  const fieldProps = useFormField({
    delay: true,
    ...props,
  });

  if (!fieldProps.whitelisted) {
    return <React.Fragment />;
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

SliderFormField.topology = allTopologies;

export default register(SliderFormField);
