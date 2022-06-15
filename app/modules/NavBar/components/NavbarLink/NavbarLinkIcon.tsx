import { makeStyles } from '@mui/styles';
import React from 'react';

export interface NavbarLinkIconProps {
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  icon: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 1,
    justifyContent: 'center',
    width: '1.5em',
  },
}));

const NavbarLinkIcon = ({ children }: NavbarLinkIconProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.icon}>
      {children}
    </div>
  );
};

export default NavbarLinkIcon;
