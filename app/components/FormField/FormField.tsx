import React from 'react';

import SortableInputs from '../../containers/Sortable/SortableInputs';
import ResourceBoundary from '../ResourceBoundary';

import { formFieldContext } from './FormFieldContext';
import FormFieldDescription from './FormFieldDescription';
import FormFieldLabel from './FormFieldLabel';
import { FormFieldProps } from './FormFieldTypes';
import FormInputs from './FormInputs';

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
        {combinedComponent ? <props.inputComponent /> : (
          props.sortable ? <SortableInputs /> : <FormInputs />
        )}
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
  removeItem: () => undefined,
};

export default FormField;
