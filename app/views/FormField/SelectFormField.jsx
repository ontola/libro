import { register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import { SelectInputWrapper } from '../../components/SelectInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const SelectFormField = (props) => {
  const fieldProps = useFormField(props);

  return (
    <FormField
      {...fieldProps}
      inputComponent={SelectInputWrapper}
    />
  );
};

SelectFormField.type = form.SelectInput;

SelectFormField.topology = allTopologies;

SelectFormField.defaultProps = {
  variant: 'default',
};

export default register(SelectFormField);
