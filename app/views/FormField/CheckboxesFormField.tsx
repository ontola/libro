import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import CheckboxesInput from '../../components/Input/CheckboxesInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

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

CheckboxesFormField.topology = allTopologies;

export default register(CheckboxesFormField);
