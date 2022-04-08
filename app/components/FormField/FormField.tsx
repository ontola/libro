import React, { FunctionComponent } from 'react';

import { PermittedFormField } from '../../hooks/useFormField';
import ResourceBoundary from '../ResourceBoundary';

import { formFieldContext } from './FormFieldContext';
import FormFieldDescription from './FormFieldDescription';
import FormFieldLabel from './FormFieldLabel';
import FormInputs from './FormInputs';
import { InputComponentProps } from './InputComponentProps';

export interface CombinedFormFieldProps extends PermittedFormField {
  combinedComponent: true;
  inputComponent: FunctionComponent;
}
export interface SingularFormFieldProps extends PermittedFormField {
  combinedComponent: false | undefined;
  inputComponent: FunctionComponent<InputComponentProps>;
}
export type FormFieldProps = CombinedFormFieldProps | SingularFormFieldProps;

/**
 * Creates a field for forms.
 *
 * Import with the async container.
 *
 * @returns {component} Component
 */
const FormField = (props: FormFieldProps): JSX.Element => {
  const {
    className,
    combinedComponent,
    ...contextProps
  } = props;

  return (
    <ResourceBoundary
      subject={contextProps.path}
      wrapperProps={{ className }}
    >
      <formFieldContext.Provider value={contextProps}>
        <FormFieldLabel />
        <FormFieldDescription />
        {combinedComponent ? <props.inputComponent /> : <FormInputs />}
      </formFieldContext.Provider>
    </ResourceBoundary>
  );
};

FormField.defaultProps = {
  combinedComponent: false,
  inputErrors: [],
  meta: {},
  onBlur: () => undefined,
  onFocus: () => undefined,
};

export default FormField;
