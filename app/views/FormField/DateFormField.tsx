import * as rdfx from '@ontologies/rdf';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import FormField, { formFieldTopologies } from '../../components/FormField/FormField';
import DatePicker from '../../containers/DatePicker';
import DateTimePicker from '../../containers/DateTimePicker';
import { useFormField } from '../../hooks/useFormField';
import form from '../../ontology/form';

const DateFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject);

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

DateFormField.topology = formFieldTopologies;

export default register(DateFormField);
