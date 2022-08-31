
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';

import FormField from '../../../../Form/components/FormField/FormField';
import { useItemFactory } from '../../../../Form/components/Input/AssociationInput/lib/useItemFactory';
import useFormField from '../../../../Form/hooks/useFormField';
import form from '../../../../Form/ontology/form';
import { formFieldTopologies } from '../../../../Form/topologies';

import GrantsInput from './GrantsInput';

const GrantsFormField: FC = ({
  subject,
}) => {
  const newItem = useItemFactory();

  const fieldProps = useFormField(subject, {
    alwaysVisible: false,
    newItem,
  });

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      combinedComponent
      {...fieldProps}
      className={fieldProps.className}
      inputComponent={GrantsInput}
      label={fieldProps.values.length > 0 ? fieldProps.label : undefined}
    />
  );
};

GrantsFormField.type = form.GrantsInput;

GrantsFormField.topology = formFieldTopologies;

export default register(GrantsFormField);
