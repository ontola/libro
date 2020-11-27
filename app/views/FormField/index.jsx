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

const registerFormField = (type, inputType, propsOverwrite) => {
  const inputProps = {
    delay: false,
    preferPlaceholder: false,
    ...propsOverwrite,
  };

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
      delay: inputProps.delay,
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
        preferPlaceholder={inputProps.preferPlaceholder}
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
  registerFormField(
    form.AssociationInput,
    'association', {
    }
  ),
  registerFormField(
    form.CheckboxGroup,
    'checkboxes', {
    }
  ),
  registerFormField(
    form.CheckboxInput,
    'checkbox', {
    }
  ),
  registerFormField(
    form.ColorInput,
    'color', {
      delay: true,
    }
  ),
  registerFormField(
    form.DateInput,
    'date', {
    }
  ),
  registerFormField(
    form.DateTimeInput,
    'datetime-local', {
    }
  ),
  registerFormField(
    form.EmailInput,
    'email', {
      delay: true,
      preferPlaceholder: true,
    }
  ),
  registerFormField(
    form.FileInput,
    'file', {
    }
  ),
  registerFormField(
    form.LocationInput,
    'location', {
    }
  ),
  registerFormField(
    form.MarkdownInput,
    (props) => (props.theme === 'omniform' ? 'textarea' : 'markdown'), {
      delay: true,
      preferPlaceholder: true,
    }
  ),
  registerFormField(
    form.NumberInput,
    'number', {
      delay: true,
    }
  ),
  registerFormField(
    form.PasswordInput,
    'password', {
      delay: true,
    }
  ),
  registerFormField(
    form.PostalRangeInput,
    'postalRange', {
      delay: true,
    }
  ),
  registerFormField(
    form.RadioGroup,
    'radioGroup', {
    }
  ),
  registerFormField(
    form.SelectInput,
    'select', {
    }
  ),
  registerFormField(
    form.SliderInput,
    'slider', {
      delay: true,
    }
  ),
  registerFormField(
    form.TextAreaInput,
    'textarea', {
      delay: true,
      preferPlaceholder: true,
    }
  ),
  registerFormField(
    form.TextInput,
    'text', {
      delay: true,
      preferPlaceholder: true,
    }
  ),
  registerFormField(
    form.ToggleButtonGroup,
    'toggleButtonGroup', {
    }
  ),
  ResourceField,
];
