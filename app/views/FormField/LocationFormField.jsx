import { register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import LocationInput from '../../components/Input/LocationInput';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const LocationFormField = (props) => {
  const fieldProps = useFormField(props);

  return (
    <FormField
      {...fieldProps}
      inputComponent={LocationInput}
    />
  );
};

LocationFormField.type = form.LocationInput;

LocationFormField.topology = allTopologies;

export default register(LocationFormField);
