import Divider from '@mui/material/Divider';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import app from '../../../../ontology/app';
import { navbarTopology } from '../../../../topologies';
import AppMenu, { AppMenuChildProps } from '../../../../topologies/AppMenu';
import { Trigger } from '../../../Menu/components/DropdownMenu/TriggerButton';

const trigger: Trigger = ({
  onClick,
  anchorRef,
  id,
  open,
}) => (
  <Resource
    aria-controls={id}
    aria-expanded={open ? 'true' : undefined}
    aria-haspopup="true"
    linkRef={anchorRef}
    subject={app.c_a}
    onClick={onClick}
  />
);

const MenuNavbar: FC = () => (
  <AppMenu trigger={trigger}>
    {({ handleClose }: AppMenuChildProps) => (
      <React.Fragment>
        <Resource
          childProps={{ onClose: handleClose }}
          subject={app.ns('menus/user/menu_items')}
        />
        <Divider />
        <Resource
          childProps={{
            hideIcon: true,
            onClose: handleClose,
          }}
          subject={app.ns('menus/session/menu_items')}
        />
      </React.Fragment>
    )}
  </AppMenu>
);

MenuNavbar.type = app.Menu;

MenuNavbar.topology = navbarTopology;

export default register(MenuNavbar);
