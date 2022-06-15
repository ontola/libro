import { FC, register } from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { formFieldTopologies } from '../../../../topologies';
import FormField from '../../components/FormField/FormField';
import RadioGroupWrapper from '../../components/RadioGroupWrapper';
import useFormField from '../../hooks/useFormField';

const RadioGroupFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject);

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

RadioGroupFormField.topology = formFieldTopologies;

export default register(RadioGroupFormField);
