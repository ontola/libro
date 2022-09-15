import { Popper, PopperProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';

const useStyles = makeStyles((theme: LibroTheme) => ({
  popper: {
    '& li': {
      '&.Mui-focused': {
        backgroundColor: theme.palette.grey.xxLight,
      },
      padding: '0.5em',
    },
    minWidth: 'fit-content',
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const FullWidthPopper = (props: PopperProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Popper
      {...props}
      className={classes.popper}
      placement="bottom-start"
    />
  );
};

export default FullWidthPopper;
