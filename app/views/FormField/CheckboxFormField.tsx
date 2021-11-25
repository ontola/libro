import { FC, register } from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import CheckboxInput from '../../components/Input/CheckboxInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';

const CheckboxFormField: FC = (props) => {
  const fieldProps = useFormField(props);

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
