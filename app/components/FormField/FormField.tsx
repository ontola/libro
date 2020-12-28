import { SomeTerm } from '@ontologies/core';
import React from 'react';

import { InputValue } from '../../hooks/useFormField';

import { ShapeForm } from '../../hooks/useShapeProps';
import FormFieldDescription from './FormFieldDescription';
import FormFieldHelper from './FormFieldHelper';
import FormFieldLabel from './FormFieldLabel';
import FormInputs from './FormInputs';

import './DateTime.scss';
import './FormField.scss';
import { FormFieldError, InputMeta } from './index';

export interface FormFieldProps {
  addItem: () => any;
  autofocus: boolean;
  className: string;
  combinedComponent: boolean;
  description: string;
  field: SomeTerm;
  fieldShape: ShapeForm;
  formIRI: SomeTerm;
  helperText: string;
  inputComponent: (args: any) => any;
  inputErrors: FormFieldError[];
  label: string | React.ReactNode;
  meta: InputMeta;
  name: string;
  onChange: (args: any) => any;
  path: SomeTerm;
  placeholder: string;
  preferPlaceholder: boolean;
  renderHelper: (args: any) => any;
  values: InputValue[];
}

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
  name,
  inputComponent,
  label,
  meta,
  onChange,
  path,
  placeholder,
  preferPlaceholder,
  renderHelper,
  values,
}: FormFieldProps) => (
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
      formIRI={formIRI}
      inputComponent={inputComponent}
      inputErrors={inputErrors}
      label={label}
      meta={meta}
      name={name}
      path={path}
      placeholder={placeholder || (preferPlaceholder ? description : undefined)}
      renderHelper={renderHelper}
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
