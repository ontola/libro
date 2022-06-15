import { FC, register } from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { formFieldTopologies } from '../../../../topologies';
import FormField from '../../components/FormField/FormField';
import IconInputField from '../../components/IconInputField';
import useFormField from '../../hooks/useFormField';

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
