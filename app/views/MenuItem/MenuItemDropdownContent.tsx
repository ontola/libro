import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import HttpStatus from 'http-status-codes';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useGlobalIds,
  useIds,
  useLRS,
  useLiterals,
} from 'link-redux';
import React from 'react';

import MenuItem from '../../components/MenuItem';
import ontola from '../../ontology/ontola';
import { appMenuTopology } from '../../topologies/AppMenu';
import { menuTopology } from '../../topologies/Menu';

interface MenuItemDropdownContentProps {
  action?: NamedNode;
  hideIcon?: boolean;
  href?: SomeNode;
  image?: SomeNode;
  menuItems?: SomeNode;
  name?: Literal;
  onClose?: () => void;
  subject: SomeNode;
}

interface MenuItemDropdownContentPropsWithRef extends MenuItemDropdownContentProps {
  innerRef: any;
}

const MenuItemDropdownContentComp = ({
  action,
  hideIcon,
  href,
  image,
  innerRef,
  menuItems,
  name,
  onClose,
  subject,
}: MenuItemDropdownContentPropsWithRef): JSX.Element => {
  const lrs = useLRS();
  const [open, setOpen] = React.useState(menuItems ? false : null);

  const handleClick = React.useCallback((e) => {
    e.preventDefault();

    if (open !== null) {
      setOpen(!open);
    }
  }, [open, setOpen]);
  const actionFunc = React.useCallback((e) => {
    if (e !== undefined) {
      e.preventDefault();
    }

    lrs
      .exec(action!)
      .catch((error) => {
        if (!error.response) {
          throw error;
        }

        if (error.response.status === HttpStatus.UNAUTHORIZED) {
          lrs
            .actions
            .app
            .startSignIn();
        }
      });
  }, [lrs, action]);
  const childProps = React.useMemo(() => ({
    hideIcon: true,
    onClose: action ? actionFunc : onClose,
  }), [action ? actionFunc : onClose]);

  const sharedProps = {
    expandOpen: open,
    icon: hideIcon ? undefined : image,
    lrs,
    ref: innerRef,
    subject,
  };

  if (menuItems) {
    return (
      <React.Fragment>
        <MenuItem
          action={handleClick}
          {...sharedProps}
        >
          {name?.value}
        </MenuItem>
        <Collapse
          unmountOnExit
          in={open === null ? undefined : open}
          timeout="auto"
        >
          <List
            disablePadding
            component="div"
          >
            <Property
              childProps={childProps}
              label={ontola.menuItems}
            />
          </List>
        </Collapse>
      </React.Fragment>
    );
  }

  return (
    <MenuItem
      action={childProps.onClose}
      allowExternal={false}
      url={href && href.value}
      {...sharedProps}
    >
      {name?.value}
    </MenuItem>
  );
};

const MenuItemDropdownContent = React.forwardRef<FC, MenuItemDropdownContentProps>(
  (props, ref) => {
    const[action] = useGlobalIds(ontola.action);
    const[href] = useIds(ontola.href);
    const[image] = useIds(schema.image);
    const[menuItems] = useIds(ontola.menuItems);
    const[name] = useLiterals(schema.name);

    return(
      <MenuItemDropdownContentComp
        innerRef={ref}
        {...props}
        action={action}
        href={href}
        image={image}
        menuItems={menuItems}
        name={name}
      />
    );
  },
) as unknown as FC;

MenuItemDropdownContent.type = ontola.MenuItem;

MenuItemDropdownContent.topology = [
  appMenuTopology,
  menuTopology,
];

export default register(MenuItemDropdownContent);
