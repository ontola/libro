import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import {
  linkType,
  literal,
  register,
  useResourceProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import FormField from '../../components/FormField/FormField';
import { tryParseInt } from '../../helpers/numbers';
import useFormField from '../../hooks/useFormField';
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
  maxCountProp: ontola.maxCount,
  maxInclusive: literal(sh.maxInclusive),
  maxInclusiveProp: ontola.maxInclusive,
  maxLength: literal(sh.maxLength),
  minCount: literal(sh.minCount),
  minCountProp: ontola.minCount,
  minInclusive: literal(sh.minInclusive),
  minInclusiveProp: ontola.minInclusive,
  minLength: literal(sh.minLength),
  minLengthProp: ontola.minLength,
  path: sh.path,
  shIn: sh.in,
};

const registerFormField = (type, inputType, delay) => {
  const FormFieldComp = ({
    addFieldName,
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
    const [maxCount] = useResourceProperty(props.object, props.maxCountProp);
    const [maxInclusive] = useResourceProperty(props.object, props.maxInclusiveProp);
    const [minCount] = useResourceProperty(props.object, props.minCountProp);
    const [minInclusive] = useResourceProperty(props.object, props.minInclusiveProp);
    const [minLength] = useResourceProperty(props.object, props.minLengthProp);
    const propOverwrites = {
      maxCount: tryParseInt(maxCount) || props.maxCount,
      maxInclusive: tryParseInt(maxInclusive) || props.maxInclusive,
      minCount: tryParseInt(minCount) || props.minCount,
      minInclusive: tryParseInt(minInclusive) || props.minInclusive,
      minLength: tryParseInt(minLength) || props.minLength,
    };
    propOverwrites.minCount = props.inputType !== 'association'
      && typeof propOverwrites.minCount === 'undefined' ? 1 : propOverwrites.minCount;
    propOverwrites.required = props.required
      || (propOverwrites.minCount ? propOverwrites.minCount > 0 : false);

    const [input, meta, storeKey] = useFormField({
      delay,
      required: propOverwrites.required,
      ...props,
      ...propOverwrites,
    });

    React.useLayoutEffect(() => {
      if (input && addFieldName) {
        addFieldName(input.name);
      }
    }, [input?.name]);

    if (!whitelisted) {
      return null;
    }

    if (!input) {
      return null;
    }

    const resolvedInputType = typeof inputType === 'function' ? inputType(props) : inputType;

    return (
      <FormField
        {...formFieldProps}
        {...props}
        {...propOverwrites}
        input={input}
        meta={meta}
        storeKey={storeKey}
        type={resolvedInputType}
      />
    );
  };

  FormFieldComp.type = type;

  FormFieldComp.topology = allTopologies;

  FormFieldComp.mapDataToProps = mapDataToProps;

  FormFieldComp.propTypes = {
    addFieldName: PropTypes.func,
    inputType: PropTypes.string,
    maxCount: PropTypes.number,
    maxCountProp: linkType,
    maxInclusive: PropTypes.number,
    maxInclusiveProp: linkType,
    minCount: PropTypes.number,
    minCountProp: linkType,
    minInclusive: PropTypes.number,
    minInclusiveProp: linkType,
    minLength: PropTypes.number,
    minLengthProp: linkType,
    object: linkType,
    path: linkType,
    required: PropTypes.bool,
    setHasContent: PropTypes.func,
    whitelist: PropTypes.arrayOf(PropTypes.number),
  };

  return register(FormFieldComp);
};

export default [
  registerFormField(form.CheckboxGroup, 'checkboxes', false),
  registerFormField(form.CheckboxInput, 'checkbox', false),
  registerFormField(form.ColorInput, 'color', true),
  registerFormField(form.DateInput, 'date', false),
  registerFormField(form.DateTimeInput, 'datetime-local', false),
  registerFormField(form.EmailInput, 'email', true),
  registerFormField(form.FileInput, 'file', false),
  registerFormField(form.LocationInput, 'location', false),
  registerFormField(form.MarkdownInput, (props) => (props.theme === 'omniform' ? 'textarea' : 'markdown'), true),
  registerFormField(form.NumberInput, 'number', true),
  registerFormField(form.RadioGroup, 'radioGroup', false),
  registerFormField(form.SelectInput, 'select', false),
  registerFormField(form.TextAreaInput, 'textarea', true),
  registerFormField(form.TextInput, 'text', true),
  registerFormField(form.ToggleButtonGroup, 'toggleButtonGroup', false),
  registerFormField(form.PasswordInput, 'password', true),
  registerFormField(form.AssociationInput, 'association', false),
  registerFormField(form.PostalRangeInput, 'postalRange', true),
  registerFormField(form.SliderInput, 'slider', true),
  ResourceField,
];
