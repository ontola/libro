import { FC, register } from 'link-redux';
import React from 'react';

import { formFieldTopologies } from '../../components/FormField/FormField';
import SwipeInputLoader from '../../containers/SwipeInput';
import { useFormField } from '../../hooks/useFormField';
import form from '../../ontology/form';

const SwipeFormField: FC = ({ subject }) => {
  const fieldProps = useFormField(subject, {
    delay: true,
  });

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <SwipeInputLoader
      {...fieldProps}
    />
  );
};

SwipeFormField.type = [
  form.SwipeInput,
];

SwipeFormField.topology = formFieldTopologies;

export default register(SwipeFormField);
