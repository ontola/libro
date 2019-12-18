import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node,
};

const useStyles = makeStyles(() => ({
  icon: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 1,
    justifyContent: 'center',
    width: '1.5em',
  },
}));

const NavbarLinkIcon = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.icon}>
      {children}
    </div>
  );
};

NavbarLinkIcon.propTypes = propTypes;

export default NavbarLinkIcon;
