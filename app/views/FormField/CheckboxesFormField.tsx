import { FC, register } from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import CheckboxesInput from '../../components/Input/CheckboxesInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';

const CheckboxesFormField: FC = (props) => {
  const fieldProps = useFormField(props);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      combinedComponent
      {...fieldProps}
      inputComponent={CheckboxesInput}
    />
  );
};

CheckboxesFormField.type = form.CheckboxGroup;

CheckboxesFormField.topology = formFieldTopologies;

export default register(CheckboxesFormField);
