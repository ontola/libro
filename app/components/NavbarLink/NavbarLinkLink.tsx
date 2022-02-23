import { useTheme } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import { Node } from '@ontologies/core';
import { Resource } from 'link-redux';
import React, { AriaAttributes } from 'react';
import FontAwesome from 'react-fontawesome';
import { NavLink, NavLinkProps } from 'react-router-dom';

import { isDifferentWebsite, retrievePath } from '../../helpers/iris';
import { LibroTheme } from '../../themes/themes';
import ExternalLink from '../Link/ExternalLink';

export interface NavbarLinkLinkProps extends Pick<AriaAttributes, 'aria-controls' | 'aria-expanded' | 'aria-haspopup'> {
  children?: React.ReactNode;
  icon?: string | JSX.Element;
  image?: Node;
  label?: string | JSX.Element;
  onClick?: React.MouseEventHandler;
  spin?: boolean,
  title: string,
  to?: string;
}

const useStyles = makeStyles(() => ({
  button: {
    minWidth: 'unset',
  },
}));

const NavbarLinkLink = React.forwardRef<HTMLButtonElement, NavbarLinkLinkProps>(({
  children,
  icon,
  image,
  label,
  onClick,
  spin,
  title,
  to,
  ...ariaProps
}: NavbarLinkLinkProps, ref): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme<LibroTheme>();
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
    <FontAwesome
      name={icon}
      spin={spin}
    />
  );

  let Component: React.ComponentType<any> | string;
  const buttonProps: Partial<React.ButtonHTMLAttributes<unknown> & NavLinkProps & ButtonProps> = {
    'aria-label': title,
    className: classes.button,
    title: title,
  };

  if (!to) {
    Component = 'button';
    buttonProps.onClick = onClick;
    buttonProps.ref = ref;
  } else if (isDifferentWebsite(to)) {
    Component = ExternalLink;
    buttonProps.href = to;
  } else {
    Component = NavLink;
    buttonProps.exact = true;
    buttonProps.activeClassName = 'active';
    buttonProps.to = retrievePath(to);
    buttonProps.ref = ref;
  }

  if (!children && image) {
    return (
      <Component {...buttonProps as NavLinkProps}>
        <Resource subject={image} />
      </Component>
    );
  }

  const child = (hideLabel && iconCom) ? iconCom : (children || label);

  return (
    <Button
      {...buttonProps}
      aria-controls={ariaProps['aria-controls']}
      aria-expanded={ariaProps['aria-expanded']}
      aria-haspopup={ariaProps['aria-haspopup']}
      color="inherit"
      component={Component as React.ComponentType<any>}
      ref={ref}
      startIcon={!hideLabel && iconCom}
      onClick={onClick}
    >
      {child}
    </Button>
  );
});

export default NavbarLinkLink;
