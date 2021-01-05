import React from 'react';

import { PermittedFormField } from '../../hooks/useFormField';

import FormFieldDescription from './FormFieldDescription';
import FormFieldHelper from './FormFieldHelper';
import FormFieldLabel from './FormFieldLabel';
import FormInputs from './FormInputs';

import './DateTime.scss';
import './FormField.scss';

export interface FormFieldProps extends PermittedFormField {
  combinedComponent?: boolean;
  inputComponent: (args: any) => any;
  renderHelper?: (args: any) => any;
}

/**
 * Creates a field for forms.
 *
 * Import with the async container.
 *
 * @returns {component} Component
 */
const FormField: React.FC<FormFieldProps> = ({
  addItem,
  inputErrors,
  autofocus,
  className,
  combinedComponent,
  description,
  field,
  fieldShape,
  helperText,
  name,
  inputComponent,
  label,
  meta,
  onChange,
  path,
  preferPlaceholder,
  renderHelper,
  storeKey,
  values,
}) => (
  <div className={className}>
    {label && (
      <FormFieldLabel
        label={label}
        name={name}
        required={fieldShape.required}
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
      inputComponent={inputComponent}
      inputErrors={inputErrors}
      label={label}
      meta={meta}
      name={name}
      path={path}
      placeholder={preferPlaceholder ? description : undefined}
      renderHelper={renderHelper}
      storeKey={storeKey}
      values={values}
      onChange={onChange}
    />
  </div>
);

FormField.defaultProps = {
  combinedComponent: true,
  preferPlaceholder: false,
  renderHelper: FormFieldHelper,
};

export default FormField;
