import { FC, register } from 'link-redux';
import React from 'react';

import SwipeInputLoader from '../../components/SwipeInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

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
