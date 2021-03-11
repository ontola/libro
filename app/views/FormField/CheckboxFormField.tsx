import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import CheckboxHelper from '../../components/Input/CheckboxHelper';
import CheckboxInput from '../../components/Input/CheckboxInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const CheckboxFormField: FC = (props) => {
  const fieldProps = useFormField(props);

  if (!fieldProps.whitelisted) {
    return <React.Fragment />;
  }

  return (
    <FormField
      {...fieldProps}
      description={undefined}
      inputComponent={CheckboxInput}
      label={undefined}
      renderHelper={CheckboxHelper}
    />
  );
};

CheckboxFormField.type = form.CheckboxInput;

CheckboxFormField.topology = allTopologies;

export default register(CheckboxFormField);
