import rdf from '@ontologies/core';
import classNames from 'classnames';
import {
  linkType,
  topologyType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  clearRemoval,
  destroyFieldName,
  isMarkedForRemove,
} from '../../helpers/forms';

import './DateTime.scss';
import './FormField.scss';
import FormFieldAddButton from './FormFieldAddButton';
import FormInputs from './FormInputs';
import { optionsType } from './OptionsWrapper';

import { formFieldError } from './index';

const propTypes = {
  autoComplete: PropTypes.string,
  autofocus: PropTypes.bool,
  autofocusForm: PropTypes.bool,
  // Preferably use variants to style this component.
  className: PropTypes.string,
  description: PropTypes.string,
  /** @private */
  fieldApi: PropTypes.shape({
    setTouched: PropTypes.func,
    setValue: PropTypes.func,
  }),
  formIRI: linkType,
  helperText: PropTypes.string,
  /** Ensure that it matches the label `for` attribute */
  id: PropTypes.string,
  /** @private Contains form-library specific data */
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.arrayOf(linkType),
  }),
  // Text above input field
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  maxCount: PropTypes.number,
  maxLength: PropTypes.number,
  /** @private Contains form-library specific data */
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
    error: PropTypes.arrayOf(formFieldError),
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    touched: PropTypes.bool,
  }),
  minCount: PropTypes.number,
  minLength: PropTypes.number,
  // Minimal number of rows for textAreas
  minRows: PropTypes.number,
  // Name of the input, defaults to the field name
  name: PropTypes.string,
  newItem: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  preferPlaceholder: PropTypes.bool,
  propertyIndex: PropTypes.number,
  renderDescription: PropTypes.func,
  renderLabel: PropTypes.func,
  required: PropTypes.bool,
  sequenceIndex: PropTypes.number,
  shIn: optionsType,
  storeKey: PropTypes.string,
  submissionErrors: PropTypes.objectOf(PropTypes.arrayOf(formFieldError)),
  theme: PropTypes.string,
  topology: topologyType,
  // HTML input type, e.g. 'email'
  type: PropTypes.string,
  // Modify te look and feel of the FormField
  variant: PropTypes.oneOf([
    'default',
    'material',
    'preview',
  ]),
};

const defaultProps = {
  autofocus: false,
  maxCount: 1,
  variant: 'default',
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

/**
 * Creates a field for forms.
 *
 * Import with the async container.
 *
 * @returns {component} Component
 */
const FormField = (props) => {
  const {
    autofocus,
    autofocusForm,
    className,
    description,
    helperText,
    input,
    label,
    meta,
    maxCount,
    minCount,
    newItem,
    placeholder,
    preferPlaceholder,
    renderDescription: DescriptionRenderer,
    renderLabel: LabelRenderer,
    required,
    sequenceIndex,
    submissionErrors,
    theme,
    type,
    variant,
  } = props;
  const {
    active,
    dirty,
    error,
    invalid,
  } = meta;
  const { name } = input;
  const addItem = React.useCallback(() => {
    const newValue = input.value?.slice() || [];

    const removedIndex = newValue.findIndex((value) => (
      value[destroyFieldName] === rdf.literal(true)
    ));

    if (removedIndex >= 0) {
      newValue[removedIndex] = clearRemoval(newValue[removedIndex]);
    } else {
      newValue.push(newItem());
    }

    input.onChange(newValue);
  }, [input]);

  const values = inputValues(input, minCount, newItem);
  const removable = (minCount !== 1 || maxCount > 1) && type !== 'checkboxes';
  const resolvedVariant = theme === 'omniform' ? 'preview' : variant;
  const allErrs = submissionErrors?.[input.name] || error;
  const classes = classNames({
    Field: true,
    [`Field--variant-${resolvedVariant}`]: resolvedVariant,
    'Field--active': active,
    'Field--dirty': dirty,
    'Field--error': !!allErrs,
    'Field--warning': invalid,
    [className]: className,
  });

  return (
    <div className={classes}>
      {LabelRenderer && (
        <LabelRenderer
          label={label}
          name={name}
          required={required}
          theme={theme}
        />
      )}
      {DescriptionRenderer && (
        <DescriptionRenderer
          description={description}
          helperText={helperText}
          preferPlaceholder={preferPlaceholder}
        />
      )}
      <FormInputs
        {...props}
        allErrs={allErrs}
        autofocus={autofocus || (autofocusForm && sequenceIndex === 0)}
        placeholder={placeholder || (preferPlaceholder ? description : null)}
        removable={removable}
        values={values}
        variant={resolvedVariant}
      />
      {(type !== 'checkboxes' && (!maxCount || values.filter((val) => !isMarkedForRemove(val)).length < maxCount)) && (
        <FormFieldAddButton
          addItem={addItem}
          label={label}
        />
      )}
    </div>
  );
};

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default FormField;
