import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

import { LibroTheme } from '../../themes/themes';

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
