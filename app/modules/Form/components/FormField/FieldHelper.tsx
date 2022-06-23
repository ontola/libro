import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../../../themes/themes';
import { isString } from '../../../Common/lib/typeCheckers';
import { useFieldErrorStyles } from '../../../Core/views/ErrorResponse';
import { formContext } from '../Form/FormContext';

import { FormFieldError } from './FormFieldTypes';

interface PropTypes {
  helperText?: string | React.ReactNode;
  error?: FormFieldError;
  right?: React.ReactNode;
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  fieldHelper: {
    color: theme.palette.grey.main,
    display: 'flex',
    fontSize: '.8em',
    justifyContent: 'space-between',
    paddingRight: '.8rem',
  },
  fieldHelperPreview: {
    bottom: 0,
    height: 'initial',
    padding: '5px 20px 0',
    position: 'absolute',
  },
  fieldHelperRight: {
    marginLeft: 'auto',
  },
}));

const FieldHelper: React.FC<PropTypes> = ({
  helperText,
  error,
  right,
}) => {
  const { theme } = React.useContext(formContext);
  const classes = useStyles();
  const className = clsx({
    [classes.fieldHelper]: true,
    [classes.fieldHelperPreview]: theme === 'preview',
  });
  const errorClassName = useFieldErrorStyles();

  if (!helperText && !error) {
    return null;
  }

  const err = error && (
    <span className={errorClassName.fieldError}>
      {isString(error) ? error : error.error}
    </span>
  );

  return (
    <div className={className}>
      {err || helperText}
      {right && (
        <span className={classes.fieldHelperRight}>
          {right}
        </span>
      )}
    </div>
  );
};

export default FieldHelper;
