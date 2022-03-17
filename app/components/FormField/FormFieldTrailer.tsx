import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { FormContext } from '../Form/Form';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import { FormFieldContext } from './FormField';

import { FormFieldError } from './';

interface FormFieldTrailerProps {
  errors: FormFieldError[];
  inputValue: SomeTerm;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  error: {
    color: theme.palette.error.main,
  },
  fieldInputTrailingIcon: {
    alignSelf: 'center',
    fontSize: '1rem',
    paddingRight: '.1em',
  },
}));

const FormFieldTrailer: React.FC<FormFieldTrailerProps> = ({
  errors,
  inputValue,
}) => {
  const { theme } = React.useContext(FormContext);
  const classes = useStyles();
  const {
    fieldShape: { maxLength },
    meta,
  } = React.useContext(FormFieldContext);
  const {
    invalid,
    touched,
  } = meta;

  if (errors && errors.length > 0 && invalid && touched) {
    return (
      <span
        className={clsx(classes.fieldInputTrailingIcon, 'fa', 'fa-exclamation-circle', classes.error)}
        title={errors[0].error}
      />
    );
  }

  if (theme === 'preview' && maxLength) {
    return (
      <CharCounter
        maxLength={maxLength}
        threshold={CHAR_COUNTER_THRESHOLD}
        value={inputValue?.value}
      />
    );
  }

  return null;
};

export default FormFieldTrailer;
