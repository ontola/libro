import { FC, register } from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import ToggleButtonGroup from '../../components/ToggleButtonGroup';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';

const ToggleButtonGroupField: FC = (props) => {
  const fieldProps = useFormField(props);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={ToggleButtonGroup}
    />
  );
};

ToggleButtonGroupField.type = [
  form.ToggleButtonGroup,
];

ToggleButtonGroupField.topology = formFieldTopologies;

export default register(ToggleButtonGroupField);
