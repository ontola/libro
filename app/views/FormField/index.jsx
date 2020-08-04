import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import {
  linkType,
  literal,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import form from '../../ontology/form';
import ontola from '../../ontology/ontola';
import { allTopologies } from '../../topologies';

import ResourceField from './ResourceField';

const formFieldProps = {
  autoComplete: 'off',
  validateOnChange: true,
};

const mapDataToProps = {
  datatype: sh.datatype,
  description: literal(schema.text),
  helperText: literal(ontola.helperText),
  label: literal(schema.name),
  maxCount: literal(sh.maxCount),
  maxInclusive: literal(sh.maxInclusive),
  maxLength: literal(sh.maxLength),
  minCount: literal(sh.minCount),
  minInclusive: literal(sh.minInclusive),
  minLength: literal(sh.minLength),
  path: sh.path,
  shIn: sh.in,
};

const registerFormField = (type, input) => {
  const FormFieldComp = ({
    setHasContent,
    whitelist,
    ...props
  }) => {
    const whitelisted = !whitelist || whitelist.includes(rdf.id(props.path));

    React.useLayoutEffect(() => {
      if (whitelisted && setHasContent) {
        setHasContent(true);
      }
    });

    if (!whitelisted) {
      return null;
    }

    const resolvedInput = typeof input === 'function' ? input(props) : input;

    return (
      <FormField {...formFieldProps} {...props} type={resolvedInput} />
    );
  };

  FormFieldComp.type = type;

  FormFieldComp.topology = allTopologies;

  FormFieldComp.mapDataToProps = mapDataToProps;

  FormFieldComp.propTypes = {
    path: linkType,
    setHasContent: PropTypes.func,
    whitelist: PropTypes.arrayOf(PropTypes.number),
  };

  return register(FormFieldComp);
};

export default [
  registerFormField(form.CheckboxGroup, 'checkboxes'),
  registerFormField(form.CheckboxInput, 'checkbox'),
  registerFormField(form.DateInput, 'date'),
  registerFormField(form.DateTimeInput, 'datetime-local'),
  registerFormField(form.EmailInput, 'email'),
  registerFormField(form.FileInput, 'file'),
  registerFormField(form.LocationInput, 'location'),
  registerFormField(form.MarkdownInput, (props) => (props.theme === 'omniform' ? 'textarea' : 'markdown')),
  registerFormField(form.NumberInput, 'number'),
  registerFormField(form.RadioGroup, 'radioGroup'),
  registerFormField(form.SelectInput, 'select'),
  registerFormField(form.TextAreaInput, 'textarea'),
  registerFormField(form.TextInput, 'text'),
  registerFormField(form.ToggleButtonGroup, 'toggleButtonGroup'),
  registerFormField(form.PasswordInput, 'password'),
  registerFormField(form.AssociationInput, 'association'),
  ResourceField,
];
