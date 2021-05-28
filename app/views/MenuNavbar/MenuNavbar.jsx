import Divider from '@material-ui/core/Divider';
import MenuClose from '@material-ui/icons/Close';
import MenuOpen from '@material-ui/icons/Menu';
import {
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { NavbarLinkLink } from '../../components/NavbarLink';
import app from '../../ontology/app';
import AppMenu from '../../topologies/AppMenu';
import { navbarTopology } from '../../topologies/Navbar';

import useStyles from './MenuNavbarStyles';

const MenuNavbar = () => {
  const classes = useStyles();

  const trigger = (onClick, open) => {
    const icon = open ? <MenuClose /> : <MenuOpen />;

    return (
      <NavbarLinkLink
        icon={icon}
        label="Menu"
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
