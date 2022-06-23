import * as rdfx from '@ontologies/rdf';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import { formFieldTopologies } from '../../../../topologies';
import DateInput, { DateInputType } from '../../components/DateInput';
import FormField from '../../components/FormField/FormField';
import { InputComponentProps } from '../../components/FormField/FormFieldTypes';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';

const DatePicker = (props: InputComponentProps) => (
  <DateInput
    type={DateInputType.Date}
    {...props}
  />
);
const DateTimePicker = (props: InputComponentProps) => (
  <DateInput
    type={DateInputType.DateTime}
    {...props}
  />
);

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
