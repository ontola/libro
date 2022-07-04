import { AutocompleteGetTagProps, Chip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme } from '../../../../Common/theme/types';
import { FormFieldError } from '../../FormField/FormFieldTypes';

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
