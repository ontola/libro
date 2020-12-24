import { register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import CheckboxesInput from '../../components/Input/CheckboxesInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const CheckboxesFormField = (props) => {
  const fieldProps = useFormField(props);

  return (
    <FormField
      {...fieldProps}
      combinedComponent={false}
      inputComponent={CheckboxesInput}
    />
  );
};

CheckboxesFormField.type = form.CheckboxGroup;

CheckboxesFormField.topology = allTopologies;

export default register(CheckboxesFormField);
