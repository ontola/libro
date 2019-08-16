import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import {
  Property,
  linkType,
  lrsType,
  register,
  subjectType,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { MenuItem } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
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
  const [nameOverride, setNameOverride] = React.useState(undefined);
  const [open, setOpen] = React.useState(menuItems ? false : null);

  function handleClick(e) {
    e.preventDefault();
    if (open !== null) {
      setOpen(!open);
    }
  }

  function actionFunc(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    lrs
      .exec(action)
      .then((msg) => {
        if (typeof msg === 'string') {
          setNameOverride(msg);
        }
      });
  }

  const sharedProps = {
    expandOpen: open,
    icon: hideIcon ? null : image,
    lrs,
    ref: innerRef,
    subject,
  };

  if (menuItems) {
    return (
      <Fragment>
        <MenuItem
          action={handleClick}
          subject={subject}
          {...sharedProps}
        >
          {nameOverride || name.value}
        </MenuItem>
        <Collapse unmountOnExit in={open} timeout="auto">
          <List disablePadding component="div">
            <Property
              childProps={{
                hideIcon: true,
                onClose: action ? actionFunc : onClose,
              }}
              label={NS.ontola('menuItems')}
            />
          </List>
        </Collapse>
      </Fragment>
    );
  }

  return (
    <MenuItem
      action={action ? actionFunc : onClose}
      url={href && href.value}
      {...sharedProps}
    >
      {nameOverride || name.value}
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

MenuItemDropdownContent.type = NS.ontola('MenuItem');

MenuItemDropdownContent.topology = [
  appMenuTopology,
  menuTopology,
];

MenuItemDropdownContent.mapDataToProps = [
  NS.ontola('action'),
  NS.ontola('href'),
  NS.schema('name'),
  NS.ontola('menuItems'),
  NS.schema('image'),
];

export default register(MenuItemDropdownContent);
