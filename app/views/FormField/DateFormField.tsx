import rdfx from '@ontologies/rdf';
import { FC, register, useProperty } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import DatePicker from '../../containers/DatePicker';
import DateTimePicker from '../../containers/DateTimePicker';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const DateFormField: FC = (props) => {
  const fieldProps = useFormField(props);

  const [type] = useProperty(rdfx.type);

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={type === form.DateTimeInput ? DateTimePicker : DatePicker}
    />
  );
};

DateFormField.type = [
  form.DateInput,
  form.DateTimeInput,
];

DateFormField.topology = allTopologies;

export default register(DateFormField);
