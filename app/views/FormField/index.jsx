import rdf from '@ontologies/core';
import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import classNames from 'classnames';
import {
  ReturnType,
  linkType,
  literal,
  register,
  useResourceLink,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import uuidv4 from 'uuid/v4';

import { formFieldError } from '../../components/FormField';
import CheckboxHelper from '../../components/FormField/CheckboxHelper';
import FormField from '../../components/FormField/FormField';
import FormFieldDescription from '../../components/FormField/FormFieldDescription';
import FormFieldHelper from '../../components/FormField/FormFieldHelper';
import FormFieldLabel from '../../components/FormField/FormFieldLabel';
import { clearRemoval, destroyFieldName } from '../../helpers/forms';
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

const inputValues = (input, minCount, newItem) => {
  let currentValue = input.value;

  if (currentValue && !Array.isArray(currentValue)) {
    currentValue = [currentValue];
  }

  if (!currentValue || currentValue.length === 0) {
    if (minCount > 0) {
      return [newItem()];
    }

    return [];
  }

  return currentValue;
};

const shapeProps = ['maxCount', 'maxInclusive', 'minCount', 'minInclusive', 'minLength'];

const useFieldShape = (props, defaultMinCount) => {
  const propMap = {};
  shapeProps.forEach((prop) => {
    if (props[`${prop}Prop`]) {
      propMap[prop] = props[`${prop}Prop`];
    }
  });

  const empty = Object.keys(propMap).length === 0;

  const shape = useResourceLink(
    empty ? props.subject : props.object,
    empty ? {} : propMap,
    { returnType: ReturnType.Literal }
  );

  shape.required = props.required
    || (shape.minCount ? shape.minCount > 0 : false);
  shape.minCount = defaultMinCount && typeof shape.minCount === 'undefined'
    ? defaultMinCount
    : shape.minCount;

  return shape;
};

const registerFormField = (type, inputType, propsOverwrite) => {
  const inputProps = {
    defaultMinCount: 1,
    delay: false,
    newItem: () => rdf.literal(''),
    preferPlaceholder: false,
    renderDescription: FormFieldDescription,
    renderHelper: FormFieldHelper,
    renderLabel: FormFieldLabel,
    useStorage: true,
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
    }, [whitelisted, setHasContent]);

    const fieldShape = useFieldShape(props, inputProps.defaultMinCount);

    const [input, meta, storeKey] = useFormField({
      delay: inputProps.delay,
      ...props,
      ...fieldShape,
    });

    React.useLayoutEffect(() => {
      if (input && addFieldName) {
        addFieldName(input.name);
      }
    }, [input?.name]);

    const {
      active,
      dirty,
      error,
      invalid,
    } = meta;

    const resolvedInputType = typeof inputType === 'function' ? inputType(props) : inputType;

    const addItem = React.useCallback(() => {
      const newValue = input.value?.slice() || [];

      const removedIndex = newValue.findIndex((value) => (
        value[destroyFieldName] === rdf.literal(true)
      ));

      if (removedIndex >= 0) {
        newValue[removedIndex] = clearRemoval(newValue[removedIndex]);
      } else {
        newValue.push(inputProps.newItem());
      }

      input.onChange(newValue);
    }, [input.value, input.onChange]);

    if (!whitelisted) {
      return null;
    }

    if (!input) {
      return null;
    }

    const values = inputValues(input, fieldShape.minCount, inputProps.newItem);
    const resolvedVariant = props.theme === 'omniform' ? 'preview' : props.variant;
    const allErrs = props.submissionErrors?.[input.name] || error;
    const className = classNames({
      Field: true,
      [`Field--variant-${resolvedVariant}`]: resolvedVariant,
      'Field--active': active,
      'Field--dirty': dirty,
      'Field--error': !!allErrs,
      'Field--warning': invalid,
      [props.className]: props.className,
    });

    return (
      <FormField
        {...formFieldProps}
        {...props}
        {...fieldShape}
        addItem={addItem}
        allErrs={allErrs}
        className={className}
        input={input}
        meta={meta}
        preferPlaceholder={inputProps.preferPlaceholder}
        renderDescription={inputProps.renderDescription}
        renderHelper={inputProps.renderHelper}
        renderLabel={inputProps.renderLabel}
        storeKey={storeKey}
        type={resolvedInputType}
        values={values}
        variant={resolvedVariant}
      />
    );
  };

  FormFieldComp.type = type;

  FormFieldComp.topology = allTopologies;

  FormFieldComp.mapDataToProps = mapDataToProps;

  FormFieldComp.defaultProps = {
    variant: 'default',
  };

  FormFieldComp.propTypes = {
    addFieldName: PropTypes.func,
    className: PropTypes.string,
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
    submissionErrors: PropTypes.objectOf(PropTypes.arrayOf(formFieldError)),
    theme: PropTypes.string,
    variant: PropTypes.string,
    whitelist: PropTypes.arrayOf(PropTypes.number),
  };

  return register(FormFieldComp);
};

export default [
  registerFormField(
    form.AssociationInput,
    'association', {
      className: 'Field--association',
      defaultMinCount: 0,
      newItem: () => ({ '@id': rdf.blankNode(uuidv4()) }),
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
      renderDescription: null,
      renderHelper: CheckboxHelper,
      renderLabel: null,
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
      useStorage: false,
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
      useStorage: false,
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
