import { useTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import { Resource } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { NavLink } from 'react-router-dom';

import { isDifferentWebsite, retrievePath } from '../../helpers/iris';
import ExternalLink from '../Link/ExternalLink';

const propTypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onClick: PropTypes.func,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  to: PropTypes.string,
};

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 'unset',
  },
}));

const NavbarLinkLink = ({
  children,
  icon,
  image,
  label,
  onClick,
  ref,
  to,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up(theme.appBar.iconBreakPoint));

  if (to === undefined && !onClick) {
    return (
      <div>
        {children || label}
      </div>
    );
  }
  const hideLabel = image || (icon && !matches);

  const iconCom = typeof icon !== 'string' ? icon : (
    <Icon color="inherit" fontSize="small">
      <FontAwesome name={icon} />
    </Icon>
  );

  let Component;
  const buttonProps = {
    className: classes.button,
  };
  if (!to) {
    Component = 'button';
    buttonProps.onClick = onClick;
  } else if (isDifferentWebsite(to)) {
    buttonProps.href = to;
    Component = ExternalLink;
  } else {
    buttonProps.exact = true;
    buttonProps.activeClassName = 'active';
    buttonProps.to = retrievePath(to);
    buttonProps.ref = ref;
    Component = NavLink;
  }

  if (!children && image) {
    return (
      <Component {...buttonProps}><Resource subject={image} /></Component>
    );
  }

  const child = (hideLabel && iconCom) ? iconCom : (children || label);

  return (
    <Button
      {...buttonProps}
      color="inherit"
      component={Component}
      startIcon={!hideLabel && iconCom}
      onClick={onClick}
    >
      {child}
    </Button>
  );
};

NavbarLinkLink.propTypes = propTypes;

export default NavbarLinkLink;
