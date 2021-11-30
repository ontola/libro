import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import PropTypes from 'prop-types';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { FormContext } from '../Form/Form';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';
import { FormFieldContext } from './FormField';

import { FormFieldError } from './';

interface PropTypes {
  errors: FormFieldError[];
  inputValue: SomeTerm;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  error: {
    color: theme.palette.error.main,
  },
}));

const FormFieldTrailer: React.FC<PropTypes> = ({
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
        className={`Field__input--trailing-icon fa fa-exclamation-circle ${classes.error}`}
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
