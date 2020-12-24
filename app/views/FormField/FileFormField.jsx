import { register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import { FileInput } from '../../components/Input';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const FileFormField = (props) => {
  const fieldProps = useFormField({
    storage: false,
    ...props,
  });

  return (
    <FormField
      {...fieldProps}
      inputComponent={FileInput}
    />
  );
};

FileFormField.type = form.FileInput;

FileFormField.topology = allTopologies;

FileFormField.defaultProps = {
  variant: 'default',
};

export default register(FileFormField);
