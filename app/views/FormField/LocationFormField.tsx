import { FC, register } from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import LocationInput from '../../components/Input/LocationInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';

const LocationFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={LocationInput}
    />
  );
};

LocationFormField.type = form.LocationInput;

LocationFormField.topology = formFieldTopologies;

export default register(LocationFormField);
