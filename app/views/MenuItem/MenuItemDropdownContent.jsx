import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import * as schema from '@ontologies/schema';
import HttpStatus from 'http-status-codes';
import {
  Property,
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React from 'react';

import MenuItem from '../../components/MenuItem';
import ontola from '../../ontology/ontola';
import { appMenuTopology } from '../../topologies/AppMenu';
import { menuTopology } from '../../topologies/Menu';

const MenuItemDropdownContentComp = ({
  action,
  hideIcon,
  href,
  image,
  innerRef,
  lrs,
  menuItems,
  name,
  onClose,
  subject,
}) => {
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
      .exec(action)
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
    icon: hideIcon ? null : image,
    lrs,
    ref: innerRef,
    subject,
  };

  if (menuItems) {
    return (
      <React.Fragment>
        <MenuItem
          action={handleClick}
          subject={subject}
          {...sharedProps}
        >
          {name.value}
        </MenuItem>
        <Collapse unmountOnExit in={open} timeout="auto">
          <List disablePadding component="div">
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
      {name.value}
    </MenuItem>
  );
};

MenuItemDropdownContentComp.propTypes = {
  action: linkType,
  hideIcon: PropTypes.bool,
  href: linkType,
  image: linkType,
  innerRef: PropTypes.func,
  lrs: lrsType,
  menuItems: linkType,
  name: linkType,
  onClose: PropTypes.func,
  subject: subjectType,
};

const MenuItemDropdownContent = React.forwardRef(
  (props, ref) => <MenuItemDropdownContentComp innerRef={ref} {...props} />
);

MenuItemDropdownContent.type = ontola.MenuItem;

MenuItemDropdownContent.topology = [
  appMenuTopology,
  menuTopology,
];

MenuItemDropdownContent.mapDataToProps = {
  action: ontola.action,
  href: ontola.href,
  image: schema.image,
  menuItems: ontola.menuItems,
  name: schema.name,
};

export default register(MenuItemDropdownContent);
