import React from 'react';

import {
  InputValue,
  OnInputChange,
  PermittedFormField,
} from '../../hooks/useFormField';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { formFooterTopology } from '../../topologies/FormFooter';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';

import FormFieldDescription from './FormFieldDescription';
import FormFieldHelper from './FormFieldHelper';
import FormFieldLabel from './FormFieldLabel';
import FormInputs from './FormInputs';

import './DateTime.scss';
import './FormField.scss';

export const formFieldTopologies = [cardMainTopology, formFooterTopology, omniformFieldsTopology];

export interface FormFieldProps extends Partial<PermittedFormField> {
  combinedComponent?: boolean;
  inputComponent: (args: any) => any;
  name: string;
  onChange: OnInputChange;
  renderHelper?: (args: any) => any;
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
  addFormValue,
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
}: FormFieldProps): JSX.Element => (
  <div className={className}>
    {label && (
      <FormFieldLabel
        label={label}
        name={name}
        required={fieldShape?.required}
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
      addFormValue={addFormValue}
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
  combinedComponent: false,
  preferPlaceholder: false,
  renderHelper: FormFieldHelper,
};

export default FormField;
