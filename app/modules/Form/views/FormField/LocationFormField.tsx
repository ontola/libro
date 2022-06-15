import { FC, register } from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { formFieldTopologies } from '../../../../topologies';
import LocationInput from '../../../Map/components/LocationInput';
import FormField from '../../components/FormField/FormField';
import useFormField from '../../hooks/useFormField';

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
      helperText={null}
      inputComponent={LocationInput}
      label={undefined}
    />
  );
};

LocationFormField.type = form.LocationInput;

LocationFormField.topology = formFieldTopologies;

export default register(LocationFormField);
