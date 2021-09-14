import { Popper } from '@material-ui/core';
import { PopperProps } from '@material-ui/core/Popper/Popper';
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
