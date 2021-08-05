import makeStyles from '@material-ui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

import {
  InputValue,
  OnInputChange,
  PermittedFormField,
} from '../../hooks/useFormField';
import { LibroTheme } from '../../themes/themes';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { flowTopology } from '../../topologies/Flow';
import { formFooterTopology } from '../../topologies/FormFooter';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';
import { FormContext, FormTheme } from '../Form/Form';

import FormFieldDescription from './FormFieldDescription';
import FormFieldHelper from './FormFieldHelper';
import FormFieldLabel from './FormFieldLabel';
import FormInputs from './FormInputs';

import './DateTime.scss';
import './FormField.scss';

export const formFieldTopologies = [
  cardMainTopology,
  formFooterTopology,
  omniformFieldsTopology,
  flowTopology,
];

export interface FormFieldProps extends Partial<PermittedFormField> {
  combinedComponent?: boolean;
  inputComponent: (args: any) => any;
  name: string;
  onChange: OnInputChange;
  renderHelper?: (args: any) => any;
  values: InputValue[];
}

const FLOW_FIELD_LABEL_MARGIN = 8;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  formFieldTitleFlow: {
    '& label': {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
    fontSize: '1.5rem',
    marginBottom: theme.spacing(FLOW_FIELD_LABEL_MARGIN),
  },
}));

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
}: FormFieldProps): JSX.Element => {
  const classes = useStyles();
  const { theme } = React.useContext(FormContext);

  const formFieldTitleClassName = clsx({
    [classes.formFieldTitleFlow]: theme === FormTheme.Flow,
  });

  return (
    <div className={className}>
      {label && (
        <span className={formFieldTitleClassName}>
          <FormFieldLabel
            label={label}
            name={name}
            required={fieldShape?.required}
          />
        </span>
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
};

FormField.defaultProps = {
  combinedComponent: false,
  preferPlaceholder: false,
  renderHelper: FormFieldHelper,
};

export default FormField;
