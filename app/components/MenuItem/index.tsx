import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { SomeNode } from 'link-lib';
import React, {
  HTMLAttributes,
  MouseEvent,
  PropsWithChildren,
} from 'react';
import { NavLinkProps } from 'react-router-dom';

import Image from '../Image';
import Link from '../Link';

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
    : React.forwardRef<React.FC, Omit<NavLinkProps, 'target'>>((props, nestedRef) => (
      <Link
        allowExternal={allowExternal}
        ref={nestedRef}
        {...props}
        isActive={undefined}
        to={actionSafeURL!}
      />
    ));

  return (
    <MaterialMenuItem
      button={isButton}
      component={component}
      ref={innerRef}
      onClick={action}
    >
      {icon && (
        <ListItemIcon>
          <Image linkedProp={icon} />
        </ListItemIcon>
      )}
      <ListItemText>
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
