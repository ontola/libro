import { makeStyles } from '@mui/styles';
import React from 'react';

import CountBubble from '../CountBubble';

export interface NavbarLinkCountProps {
  count: number;
  tooltip: string;
}

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));

const NavbarLinkCount = ({ count, tooltip }: NavbarLinkCountProps): JSX.Element | null => {
  const classes = useStyles();

  if (!(count > 0)) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <CountBubble
        count={count}
        tooltip={tooltip}
      />
    </div>
  );
};

export default NavbarLinkCount;
