import { makeStyles } from '@material-ui/styles';
import { SomeTerm } from '@ontologies/core';
import PropTypes from 'prop-types';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { FormContext } from '../Form/Form';

import CharCounter, { CHAR_COUNTER_THRESHOLD } from './CharCounter';

import { FormFieldError, InputMeta } from './';

interface PropTypes {
  errors: FormFieldError[];
  inputValue: SomeTerm;
  maxLength: number;
  meta: InputMeta;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  error: {
    color: theme.palette.error.main,
  },
}));

const FormFieldTrailer: React.FC<PropTypes> = ({
  errors,
  maxLength,
  meta,
  inputValue,
}) => {
  const {
    invalid,
    touched,
  } = meta;
  const { theme } = React.useContext(FormContext);
  const classes = useStyles();

  if (errors && errors.length > 0 && invalid && touched) {
    return (
      <span
        className={`Field__input--trailing-icon fa fa-exclamation-circle ${classes.error}`}
        title={errors[0].error}
      />
    );
  }

  if (theme === 'preview') {
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
