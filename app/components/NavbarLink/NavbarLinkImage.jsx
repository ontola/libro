import { makeStyles } from '@material-ui/styles';
import { linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  linkedProp: linkedPropType.isRequired,
};

const useStyles = makeStyles(() => ({
  image: {
    backgroundSize: 'cover',
    border: '1px solid #b3b3b3',
    borderRadius: '100%',
    height: '1.5em',
    minWidth: '1.5em',
    width: '1.5em',
  },
  wrapper: {
    '& img': {
      height: '100%',
      marginLeft: '-.5em',
    },
    height: '100%',
    paddingLeft: '.5em',
  },
}));

const NavbarLinkImage = ({ linkedProp }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.image}
      style={{ backgroundImage: `url(${linkedProp.value})` }}
    />
  );
};

NavbarLinkImage.propTypes = propTypes;

const wrapperPropTypes = {
  children: PropTypes.node,
};

export const NavbarLinkImageWrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>{children}</div>
  );
};

NavbarLinkImageWrapper.propTypes = wrapperPropTypes;

export default NavbarLinkImage;
