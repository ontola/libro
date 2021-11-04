import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import AreaInput from '../../components/Input/AreaInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const AreaFormField: FC = (props) => {
  const fieldProps = useFormField(props);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={AreaInput}
    />
  );
};

AreaFormField.type = form.AreaInput;

AreaFormField.topology = allTopologies;

export default register(AreaFormField);
