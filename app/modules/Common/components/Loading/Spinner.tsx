import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  spinner: {
    color: theme.palette.pink.main,
  },
}));

const Spinner = (): JSX.Element => {
  const classes = useStyles();

  return (
    <CircularProgress className={classes.spinner} />
  );
};

export default Spinner;
