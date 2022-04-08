import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import ToggleButtonGroup from '../../components/ToggleButtonGroup';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

const ToggleButtonGroupField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject);

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
