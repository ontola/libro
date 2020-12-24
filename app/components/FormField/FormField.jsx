import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { fieldShapeType } from '../../hooks/useFormField';

import './DateTime.scss';
import './FormField.scss';
import FormFieldDescription from './FormFieldDescription';
import FormFieldHelper from './FormFieldHelper';
import FormFieldLabel from './FormFieldLabel';
import FormInputs from './FormInputs';

import { formFieldError } from './index';

const propTypes = {
  addItem: PropTypes.func,
  autofocus: PropTypes.bool,
  // Preferably use variants to style this component.
  className: PropTypes.string,
  combinedComponent: PropTypes.bool,
  description: PropTypes.string,
  field: linkType,
  fieldShape: fieldShapeType,
  formIRI: linkType,
  helperText: PropTypes.string,
  /** @private Contains form-library specific data */
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.arrayOf(linkType),
  }),
  inputComponent: PropTypes.func,
  inputErrors: PropTypes.arrayOf(formFieldError),
  // Text above input field
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  /** @private Contains form-library specific data */
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
    error: PropTypes.arrayOf(formFieldError),
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    touched: PropTypes.bool,
  }),
  // Name of the input, defaults to the field name
  name: PropTypes.string,
  path: linkType,
  placeholder: PropTypes.string,
  preferPlaceholder: PropTypes.bool,
  renderHelper: PropTypes.func,
  theme: PropTypes.string,
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
const FormField = ({
  addItem,
  inputErrors,
  autofocus,
  className,
  combinedComponent,
  description,
  field,
  fieldShape,
  formIRI,
  helperText,
  input,
  inputComponent,
  label,
  meta,
  path,
  placeholder,
  preferPlaceholder,
  renderHelper,
  theme,
  values,
  variant,
}) => {
  const { name } = input;

  return (
    <div className={className}>
      {label && (
        <FormFieldLabel
          label={label}
          name={name}
          required={fieldShape.required}
          theme={theme}
        />
      )}
      {(description || helperText) && (
        <FormFieldDescription
          description={description}
          helperText={helperText}
          preferPlaceholder={preferPlaceholder}
        />
      )}
      <FormInputs
        addItem={addItem}
        autofocus={autofocus}
        combinedComponent={combinedComponent}
        description={description}
        field={field}
        fieldShape={fieldShape}
        formIRI={formIRI}
        inputComponent={inputComponent}
        inputErrors={inputErrors}
        label={label}
        meta={meta}
        name={input.name}
        path={path}
        placeholder={placeholder || (preferPlaceholder ? description : null)}
        renderHelper={renderHelper}
        values={values}
        variant={variant}
        onChange={input.onChange}
      />
    </div>
  );
};

FormField.propTypes = propTypes;

FormField.defaultProps = {
  combinedComponent: true,
  preferPlaceholder: false,
  renderHelper: FormFieldHelper,
};

export default FormField;
