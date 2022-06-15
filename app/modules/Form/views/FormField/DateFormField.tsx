import * as rdfx from '@ontologies/rdf';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import form from '../../ontology/form';
import { formFieldTopologies } from '../../../../topologies';
import DatePicker from '../../components/DatePicker';
import DateTimePicker from '../../components/DateTimePicker';
import FormField from '../../components/FormField/FormField';
import useFormField from '../../hooks/useFormField';

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
