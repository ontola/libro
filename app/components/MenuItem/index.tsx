import {
  ListItemIcon,
  ListItemText,
  MenuItem as MaterialMenuItem,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { SomeNode } from 'link-lib';
import React, {
  HTMLAttributes,
  MouseEvent,
  PropsWithChildren,
} from 'react';
import { NavLinkProps } from 'react-router-dom';

import Image from '../Image';
import Link, { LinkProps } from '../Link';

interface MenuItemProps {
  action?: (e: MouseEvent<any>) => void;
  allowExternal?: boolean;
  expandOpen: boolean | null;
  icon?: SomeNode;
  innerRef?: any;
}

interface UrlMenuItemProps extends MenuItemProps {
  subject?: SomeNode;
  url: string;
}

interface SubjectMenuItemProps extends MenuItemProps {
  subject: SomeNode;
  url?: string;
}

const MenuItem: React.FC<UrlMenuItemProps | SubjectMenuItemProps> = ({
  action,
  allowExternal,
  children,
  expandOpen,
  icon,
  innerRef,
  subject,
  url,
}) => {
  const isButton = (action || url) ? true : undefined;
  const actionSafeURL = subject && action && !url ? subject.value : url;
  const component = !isButton
    ? React.forwardRef<any, HTMLAttributes<any> & Omit<NavLinkProps, 'to'>>((props, nestedRef) => {
      // eslint-disable-next-line  @typescript-eslint/no-unused-vars,react/prop-types
      const { ...otherProps } = props;

      return (
        <li
          ref={nestedRef}
          {...otherProps}
        />
      );
    })
    : React.forwardRef<HTMLAnchorElement, Omit<LinkProps, 'target'>>((props, nestedRef) => (
      <Link
        allowExternal={allowExternal}
        ref={nestedRef}
        {...props}
        to={actionSafeURL!}
      />
    ));

  return (
    <MaterialMenuItem
      component={component}
      ref={innerRef}
      onClick={action}
    >
      {icon && (
        <ListItemIcon>
          <Image linkedProp={icon} />
        </ListItemIcon>
      )}
      <ListItemText primaryTypographyProps={{ color: 'textPrimary' }}>
        {children}
      </ListItemText>
      {expandOpen !== null && (expandOpen ? <ExpandLess /> : <ExpandMore />)}
    </MaterialMenuItem>
  );
};

export default React.forwardRef<any, PropsWithChildren<UrlMenuItemProps | SubjectMenuItemProps>>((props, ref) => (
  <MenuItem
    innerRef={ref}
    {...props}
  />
),
);
