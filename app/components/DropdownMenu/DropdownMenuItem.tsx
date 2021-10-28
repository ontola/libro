import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import {
  Literal,
  NamedNode,
  SomeTerm,
} from '@ontologies/core';
import HttpStatus from 'http-status-codes';
import { SomeNode } from 'link-lib';
import { Property, useLRS } from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import MenuItem from '../MenuItem';

interface DropdownMenuItem {
  action?: NamedNode;
  hideIcon?: boolean;
  href?: SomeTerm;
  image?: SomeNode;
  innerRef: any;
  menuItems?: SomeNode;
  name?: Literal;
  onClose?: () => void;
  subject: SomeNode;
}

const DropdownMenuItem = ({
  action,
  hideIcon,
  href,
  image,
  innerRef,
  menuItems,
  name,
  onClose,
  subject,
}: DropdownMenuItem): JSX.Element => {
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
      url={href?.value || subject.value}
      {...sharedProps}
    >
      {name?.value}
    </MenuItem>
  );
};

export default DropdownMenuItem;
