import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import { FileInput } from '../../components/Input';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const FileFormField: FC = (props) => {
  const fieldProps = useFormField({
    storage: false,
    ...props,
  });

  if (!fieldProps.whitelisted) {
    return <React.Fragment />;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={FileInput}
    />
  );
};

FileFormField.type = form.FileInput;

FileFormField.topology = allTopologies;

export default register(FileFormField);
