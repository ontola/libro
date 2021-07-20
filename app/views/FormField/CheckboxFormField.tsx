import { FC, register } from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import CheckboxHelper from '../../components/Input/CheckboxHelper';
import CheckboxInput from '../../components/Input/CheckboxInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';

const CheckboxFormField: FC = (props) => {
  const fieldProps = useFormField(props);

  if (!fieldProps.whitelisted) {
    return null;
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

CheckboxFormField.topology = formFieldTopologies;

export default register(CheckboxFormField);
