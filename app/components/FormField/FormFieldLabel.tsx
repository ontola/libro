import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

import { BreakPoints, LibroTheme } from '../../themes/themes';
import FieldLabel from '../FieldLabel';
import { FormTheme, formContext } from '../Form/FormContext';

import { formFieldContext } from './FormFieldContext';

const FLOW_FIELD_LABEL_MARGIN = 8;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  formFieldTitleFlow: {
    '& label': {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.up(BreakPoints.Medium)]: {
      fontSize: '2rem',
    },
    fontSize: '1.5rem',
    marginBottom: theme.spacing(FLOW_FIELD_LABEL_MARGIN),
  },
}));

const FormFieldLabel: React.FC = () => {
  const { theme } = React.useContext(formContext);
  const {
    label,
    name,
    fieldShape,
  } = React.useContext(formFieldContext);
  const classes = useStyles();
  const className = clsx({
    [classes.formFieldTitleFlow]: theme === FormTheme.Flow,
  });

  if (!label) {
    return null;
  }

  return (
    <span className={className}>
      <FieldLabel
        hidden={theme === 'preview'}
        htmlFor={name}
        label={label}
        optional={!fieldShape.required}
      />
    </span>
  );
};

export default FormFieldLabel;
