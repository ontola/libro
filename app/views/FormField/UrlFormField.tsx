import { FC, register } from 'link-redux';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import { InputComponentProps } from '../../components/FormField/FormFieldTypes';
import { InputType } from '../../components/Input/Input';
import InputElement from '../../components/Input/InputElement';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { formFieldTopologies } from '../../topologies';

const UrlInput = (fieldProps: InputComponentProps) => (
  <InputElement
    {...fieldProps}
    type={InputType.Url}
  />
);

const UrlFormField: FC = ({
  subject,
}) => {
  const fieldProps = useFormField(subject, {
    delay: true,
  });

  if (!fieldProps.whitelisted) {
    return null;
  }

  return (
    <FormField
      {...fieldProps}
      inputComponent={UrlInput}
    />
  );
};

UrlFormField.type = form.UrlInput;

UrlFormField.topology = formFieldTopologies;

export default register(UrlFormField);
