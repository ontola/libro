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

const MenuItemDropdownContent = ({
  action,
  hideIcon,
  href,
  image,
  lrs,
  menuItems,
  name,
  onClose,
  subject,
}) => {
  const [nameOverride, setNameOverride] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  function handleClick(e) {
    e.preventDefault();
    setOpen(!open);
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

  if (menuItems) {
    return (
      <Fragment>
        <MenuItem
          action={handleClick}
          expandOpen={open}
          icon={hideIcon ? null : image}
          lrs={lrs}
          subject={subject}
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
      icon={hideIcon ? null : image}
      lrs={lrs}
      subject={subject}
      url={href && href.value}
    >
      {nameOverride || name.value}
    </MenuItem>
  );
};

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

MenuItemDropdownContent.propTypes = {
  action: linkType,
  hideIcon: PropTypes.bool,
  href: linkType,
  image: linkType,
  lrs: lrsType,
  menuItems: PropTypes.node,
  name: linkType,
  onClose: PropTypes.func,
  subject: subjectType,
};

export default register(MenuItemDropdownContent);
