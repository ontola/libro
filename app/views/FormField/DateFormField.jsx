import rdfx from '@ontologies/rdf';
import { register, useProperty } from 'link-redux';
import React from 'react';

import DatePicker from '../../containers/DatePicker';
import DateTimePicker from '../../containers/DateTimePicker';
import FormField from '../../components/FormField/FormField';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const DateFormField = (props) => {
  const fieldProps = useFormField(props);

  const [type] = useProperty(rdfx.type);

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
