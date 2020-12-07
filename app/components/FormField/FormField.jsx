import {
  linkType,
  topologyType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import './DateTime.scss';
import './FormField.scss';
import FormInputs from './FormInputs';
import { optionsType } from './OptionsWrapper';

import { formFieldError } from './index';

const propTypes = {
  addItem: PropTypes.func,
  allErrs: PropTypes.arrayOf(formFieldError),
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
  values: PropTypes.arrayOf(linkType),
  // Modify te look and feel of the FormField
  variant: PropTypes.oneOf([
    'default',
    'material',
    'preview',
  ]),
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
    addItem,
    allErrs,
    autofocus,
    autofocusForm,
    className,
    description,
    helperText,
    input,
    label,
    placeholder,
    preferPlaceholder,
    renderDescription: DescriptionRenderer,
    renderLabel: LabelRenderer,
    required,
    sequenceIndex,
    theme,
    values,
    variant,
  } = props;
  const { name } = input;

  return (
    <div className={className}>
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
        addItem={addItem}
        allErrs={allErrs}
        autofocus={autofocus || (autofocusForm && sequenceIndex === 0)}
        placeholder={placeholder || (preferPlaceholder ? description : null)}
        values={values}
        variant={variant}
      />
    </div>
  );
};

FormField.propTypes = propTypes;


export default FormField;
