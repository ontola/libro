import { Popper, PopperProps } from '@mui/material';
import React from 'react';

import useSelectStyles from './useSelectStyles';

const FullWidthPopper = (props: PopperProps): JSX.Element => {
  const classes = useSelectStyles();

  return (
    <Popper
      {...props}
      className={classes.popper}
      placement="bottom-start"
    />
  );
};

export default FullWidthPopper;
