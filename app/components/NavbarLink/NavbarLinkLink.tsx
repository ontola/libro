import {
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Node } from '@ontologies/core';
import React, { AriaAttributes } from 'react';
import FontAwesome from 'react-fontawesome';
import { NavLink } from 'react-router-dom';

import { isDifferentWebsite, retrievePath } from '../../helpers/iris';
import { LibroTheme } from '../../themes/themes';
import Image from '../Image';
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

const useStyles = makeStyles<LibroTheme>((theme) => ({
  button: {
    fontSize: theme.navBarFontSize,
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
  const screenIsWide = useMediaQuery(theme.breakpoints.up(theme.appBar.iconBreakPoint));

  if (to === undefined && !onClick) {
    return (
      <div>
        {children || label}
      </div>
    );
  }

  const hideLabel = image || (icon && !screenIsWide);

  const iconCom = typeof icon !== 'string' ? icon : (
    <FontAwesome
      name={icon}
      spin={spin}
    />
  );

  const baseProps = {
    'aria-label': title,
    className: classes.button,
    title: title,
    ...ariaProps,
    color: 'inherit' as const as 'inherit',
    onClick,
    startIcon: !hideLabel && iconCom,
  };

  const child = (hideLabel && iconCom) ? iconCom : (children || label);

  if (!to) {
    return (
      <Button
        {...baseProps}
        component="button"
        ref={ref}
      >
        {child}
      </Button>
    );
  }

  if (isDifferentWebsite(to)) {
    return (
      <Button
        {...baseProps}
        component={ExternalLink}
        href={to}
      >
        {child}
      </Button>
    );
  }

  return (
    <Button
      {...baseProps}
      end
      component={NavLink}
      to={retrievePath(to)}
    >
      {!children && image
        ? (
          <Image
            ariaLabel={typeof label === 'string' ? label : undefined}
            linkedProp={image}
          />
        )
        : child}
    </Button>
  );
});

export default NavbarLinkLink;
