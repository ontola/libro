import { makeStyles } from '@material-ui/styles';
import React from 'react';

import CountBubble from '../CountBubble';

export interface NavbarLinkCountProps {
  count: number;
}

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));

const NavbarLinkCount = ({ count }: NavbarLinkCountProps): JSX.Element | null => {
  const classes = useStyles();

  if (!(count > 0)) {
    return null;
  }

  return (
    <div className={classes.wrapper}>
      <CountBubble count={count} />
    </div>
  );
};

export default NavbarLinkCount;
