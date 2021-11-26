import { FC, register } from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import IconInputField from '../../containers/IconInputField';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';

const IconFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={IconInputField}
    />
  );
};

IconFormField.type = form.IconInput;

IconFormField.topology = formFieldTopologies;

export default register(IconFormField);
