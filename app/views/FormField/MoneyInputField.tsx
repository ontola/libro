import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import MoneyInput from '../../components/Input/MoneyInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const MoneyField: FC = (props) => {
  const fieldProps = useFormField({
    delay: true,
    ...props,
  });

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={MoneyInput}
    />
  );
};

MoneyField.type = form.MoneyInput;

MoneyField.topology = allTopologies;

export default register(MoneyField);
