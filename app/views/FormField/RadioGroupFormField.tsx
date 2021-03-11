import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import RadioGroupWrapper from '../../components/RadioGroupWrapper';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const RadioGroupFormField: FC = (props) => {
  const fieldProps = useFormField(props);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={RadioGroupWrapper}
    />
  );
};

RadioGroupFormField.type = form.RadioGroup;

RadioGroupFormField.topology = allTopologies;

export default register(RadioGroupFormField);
