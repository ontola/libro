import { register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import ToggleButtonGroup from '../../components/ToggleButtonGroup';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const ToggleButtonGroupField = (props) => {
  const fieldProps = useFormField(props);

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

ToggleButtonGroupField.topology = allTopologies;

ToggleButtonGroupField.defaultProps = {
  variant: 'default',
};

export default register(ToggleButtonGroupField);
