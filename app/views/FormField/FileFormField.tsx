import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import { FileInput } from '../../components/Input';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

const FileFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject, {
    storage: false,
  });

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={FileInput}
    />
  );
};

FileFormField.type = form.FileInput;

FileFormField.topology = formFieldTopologies;

export default register(FileFormField);
