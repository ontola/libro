import Divider from '@material-ui/core/Divider';
import MenuClose from '@material-ui/icons/Close';
import MenuOpen from '@material-ui/icons/Menu';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { Trigger } from '../../components/DropdownMenu/TriggerButton';
import { NavbarLinkLink } from '../../components/NavbarLink';
import app from '../../ontology/app';
import AppMenu from '../../topologies/AppMenu';
import { navbarTopology } from '../../topologies/Navbar';

import useStyles from './MenuNavbarStyles';

const MenuNavbar: FC = () => {
  const classes = useStyles();

  const trigger: Trigger = ({
    onClick,
    anchorRef,
    id,
    open,
  }) => {
    const icon = open ? <MenuClose /> : <MenuOpen />;

    return (
      <NavbarLinkLink
        aria-controls={id}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        icon={icon}
        label="Menu"
        ref={anchorRef}
        title="Menu"
        onClick={onClick}
      />
    );
  };

  return (
    <AppMenu trigger={trigger}>
      {({ handleClose }) => (
        <React.Fragment>
          <Resource
            childProps={{
              hideIcon: true,
              onClose: handleClose,
            }}
            subject={app.ns('menus/navigations/menu_items')}
          />
          <Divider />
          <React.Fragment>
            <Resource
              childProps={{ onClose: handleClose }}
              subject={app.ns('menus/user/menu_items')}
            />
            <Divider />
          </React.Fragment>
          <div className={classes.root}>
            <Resource
              childProps={{
                hideIcon: true,
                onClose: handleClose,
              }}
              subject={app.ns('menus/info/menu_items')}
            />
          </div>
        </React.Fragment>
      )}
    </AppMenu>
  );
};

MenuNavbar.type = app.Menu;

MenuNavbar.topology = navbarTopology;

export default register(MenuNavbar);
