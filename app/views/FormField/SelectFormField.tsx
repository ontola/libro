import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import SelectInputField from '../../containers/SelectInputField';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const SelectFormField: FC = (props) => {
  const fieldProps = useFormField(props);

  if (!fieldProps.whitelisted) {
    return <React.Fragment />;
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

SelectFormField.topology = allTopologies;

export default register(SelectFormField);
