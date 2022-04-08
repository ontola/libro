import React, { FunctionComponent } from 'react';

import { PermittedFormField } from '../../hooks/useFormField';
import ResourceBoundary from '../ResourceBoundary';

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

export type FormFieldContext = Omit<FormFieldProps, 'className' | 'combinedComponent' | 'whitelisted' >;

export const FormFieldContext = React.createContext<FormFieldContext>(undefined as any);

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
      <FormFieldContext.Provider value={contextProps}>
        <FormFieldLabel />
        <FormFieldDescription />
        {combinedComponent ? <props.inputComponent /> : <FormInputs />}
      </FormFieldContext.Provider>
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
