import { FC, register } from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { formFieldTopologies } from '../../../../topologies';
import FormField from '../../components/FormField/FormField';
import SelectInputField from '../../components/SelectInputField';
import useFormField from '../../hooks/useFormField';

const SelectFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      combinedComponent
      {...fieldProps}
      inputComponent={SelectInputField}
    />
  );
};

SelectFormField.type = form.SelectInput;

SelectFormField.topology = formFieldTopologies;

export default register(SelectFormField);
