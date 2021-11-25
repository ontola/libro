import makeStyles from '@material-ui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import FieldLabel from '../FieldLabel';
import { FormContext, FormTheme } from '../Form/Form';

import { FormFieldContext } from './FormField';

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

const FormFieldLabel: React.FC = () => {
  const { theme } = React.useContext(FormContext);
  const {
    label,
    name,
    fieldShape,
  } = React.useContext(FormFieldContext);
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
        required={fieldShape.required}
      />
    </span>
  );
};

export default FormFieldLabel;
