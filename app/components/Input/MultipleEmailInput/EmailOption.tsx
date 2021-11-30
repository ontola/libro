import { Chip } from '@material-ui/core';
import { AutocompleteGetTagProps } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { LibroTheme } from '../../../themes/themes';
import { FormFieldError } from '../../FormField';

interface EmailOption {
  getTagProps: AutocompleteGetTagProps;
  inputErrors: FormFieldError[];
  index: number;
  tag: string;
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  error: {
    borderBottom: `2px dashed ${theme.palette.error.dark}`,
    display: 'block',
  },
}));

const EmailOption = ({
  getTagProps,
  inputErrors,
  index,
  tag,
}: EmailOption): JSX.Element => {
  const classes = useStyles();
  const error = inputErrors.find((inputError) => inputError.index == index);

  return (
    <Chip
      color={error ? 'default' : 'primary'}
      label={(
        <span className={error ? classes.error : undefined}>
          {tag}
        </span>
      )}
      title={error?.error}
      {...getTagProps({ index })}
    />
  );
};

export default EmailOption;
