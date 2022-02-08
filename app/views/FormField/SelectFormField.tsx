import { FC, register } from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import SelectInputField from '../../containers/SelectInputField';
import { useFormField } from '../../hooks/useFormField';
import form from '../../ontology/form';

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
