import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import PostalRangeInput from '../../components/Input/PostalRangeInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

const PostalRangeFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject, {
    delay: true,
  });

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={PostalRangeInput}
    />
  );
};

PostalRangeFormField.type = [
  form.PostalRangeInput,
];

PostalRangeFormField.topology = formFieldTopologies;

export default register(PostalRangeFormField);
