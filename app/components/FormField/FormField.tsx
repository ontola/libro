import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';

import { PermittedFormField } from '../../hooks/useFormField';
import { flowTopology } from '../../modules/Flow/topologies/Flow';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { containerTopology } from '../../topologies/Container';
import { formFooterTopology } from '../../topologies/FormFooter';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';
import ResourceBoundary from '../ResourceBoundary';
import { cardTopology } from '../../topologies/Card';

import FormFieldDescription from './FormFieldDescription';
import FormFieldLabel from './FormFieldLabel';
import FormInputs from './FormInputs';
import { InputComponentProps } from './InputComponentProps';

import './FormField.scss';

export const fieldInputCID = 'CID-FieldInput';

export const formFieldTopologies = [
  cardMainTopology,
  cardTopology,
  containerTopology,
  formFooterTopology,
  omniformFieldsTopology,
  flowTopology,
];

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

export const useFormStyles = makeStyles({
  field: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
});

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
        {props.combinedComponent ? <props.inputComponent /> : <FormInputs />}
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
