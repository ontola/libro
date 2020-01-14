import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';

import hoverHighlight from '../../themes/stylelets';
import Link from '../Link';
import { navbarHeight } from '../shared/config';

const propTypes = {
  children: PropTypes.node,
  features: PropTypes.arrayOf(
    PropTypes.oneOf([
      'padded',
    ])
  ),
  isIndex: PropTypes.bool,
  onClick: PropTypes.func,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  target: PropTypes.oneOf([
    '_blank',
    '_self',
    '_parent',
    '_top',
    'modal',
  ]),
  to: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  link: {
    ...hoverHighlight(theme),
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    height: navbarHeight,
    minWidth: '2rem',
  },
}));

const NavbarLinkLink = ({
  children,
  features,
  isIndex,
  onClick,
  target,
  to,
  ref,
}) => {
  const classes = useStyles();

  if (to === undefined) {
    return (
      <button
        className={classes.link}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      activeClassName="NavbarLink--active"
      className={classes.link}
      exact={isIndex}
      features={features}
      ref={ref}
      target={target}
      to={to}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

NavbarLinkLink.propTypes = propTypes;

export default NavbarLinkLink;
