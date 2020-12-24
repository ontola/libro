import rdfx from '@ontologies/rdf';
import { register, useProperty } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { FormContext } from '../../components/Form/Form';
import FormField from '../../components/FormField/FormField';
import InputElement from '../../components/Input/InputElement';
import useFormField from '../../hooks/useFormField';
import form from '../../ontology/form';
import { allTopologies } from '../../topologies';

const getInputType = (theme, type) => {
  if (type === form.EmailInput) {
    return 'email';
  }
  if (type === form.TextAreaInput) {
    return 'textarea';
  }
  if (type === form.MarkdownInput) {
    return theme === 'preview' ? 'textarea' : 'markdown';
  }

  return 'text';
};

const TextFormField = (props) => {
  const fieldProps = useFormField({
    delay: true,
    preferPlaceholder: true,
    ...props,
  });
  const { theme } = React.useContext(FormContext);
  const [type] = useProperty(rdfx.type);
  const TextInput = React.useCallback((inputProps) => (
    <InputElement {...inputProps} type={getInputType(theme, type)} />
  ), [type]);

  return (
    <FormField
      {...fieldProps}
      inputComponent={TextInput}
    />
  );
};

TextFormField.type = [
  form.EmailInput,
  form.TextAreaInput,
  form.TextInput,
  form.MarkdownInput,
];

TextFormField.topology = allTopologies;

TextFormField.propTypes = {
  theme: PropTypes.string,
};

export default register(TextFormField);
