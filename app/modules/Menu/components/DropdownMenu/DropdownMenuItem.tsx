import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import {
  Literal,
  NamedNode,
  SomeTerm,
} from '@ontologies/core';
import HttpStatus from 'http-status-codes';
import { SomeNode } from 'link-lib';
import {
  Property,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';

import ontola from '../../../../ontology/ontola';
import MenuItem from '../MenuItem';

import { DropdownMenuContext } from './DropdownMenuContext';

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

  const handleClick = React.useCallback<MouseEventHandler>((e) => {
    e.preventDefault();

    if (open !== null) {
      setOpen(!open);
    }
  }, [open, setOpen]);
  const actionFunc = React.useCallback<MouseEventHandler>((e) => {
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
            .startSignIn(action);
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

  const { setLoaded } = React.useContext(DropdownMenuContext);

  const invalidationNumber = useDataInvalidation(ontola.menuItems);
  React.useEffect(() => {
    setLoaded(invalidationNumber);
  }, [invalidationNumber]);

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
      url={href?.value}
      {...sharedProps}
    >
      {name?.value}
    </MenuItem>
  );
};

export default DropdownMenuItem;
