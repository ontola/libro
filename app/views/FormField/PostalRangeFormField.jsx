import { register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import PostalRangeInput from '../../components/Input/PostalRangeInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const PostalRangeFormField = (props) => {
  const fieldProps = useFormField({
    delay: true,
    ...props,
  });

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

PostalRangeFormField.topology = allTopologies;

export default register(PostalRangeFormField);
