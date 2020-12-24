import { register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import CheckboxHelper from '../../components/Input/CheckboxHelper';
import CheckboxInput from '../../components/Input/CheckboxInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const CheckboxFormField = (props) => {
  const fieldProps = useFormField(props);

  return (
    <FormField
      {...fieldProps}
      description={null}
      inputComponent={CheckboxInput}
      label={null}
      renderHelper={CheckboxHelper}
    />
  );
};

CheckboxFormField.type = form.CheckboxInput;

CheckboxFormField.topology = allTopologies;

export default register(CheckboxFormField);
