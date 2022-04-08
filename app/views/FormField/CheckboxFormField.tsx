import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import CheckboxInput from '../../components/Input/CheckboxInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

const CheckboxFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      description={undefined}
      helperText={(fieldProps.helperText?.length || 0) > 0 ? fieldProps.helperText : fieldProps.description}
      inputComponent={CheckboxInput}
      label={undefined}
    />
  );
};

CheckboxFormField.type = form.CheckboxInput;

CheckboxFormField.topology = formFieldTopologies;

export default register(CheckboxFormField);
