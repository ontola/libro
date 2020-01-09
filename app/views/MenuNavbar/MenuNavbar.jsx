import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuClose from '@material-ui/icons/Close';
import MenuOpen from '@material-ui/icons/Menu';
import { useTheme } from '@material-ui/styles';
import {
  Resource,
  register,
} from 'link-redux';
import React, { Fragment } from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import AppMenu from '../../topologies/AppMenu';
import { navbarTopology } from '../../topologies/Navbar';

import useStyles from './MenuNavbarStyles';

const MenuNavbar = () => {
  const classes = useStyles();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const trigger = (onClick, open) => (
    <Button
      aria-label="open"
      className={classes.button}
      color="inherit"
      size="large"
      onClick={onClick}
    >
      {open ? <MenuClose /> : <MenuOpen />}{matches && ' Menu'}
    </Button>
  );

  return (
    <AppMenu trigger={trigger}>
      {({ handleClose }) => (
        <Fragment>
          <Resource
            childProps={{
              hideIcon: true,
              onClose: handleClose,
            }}
            subject={NS.app('menus/navigations/menus')}
          />
          <Divider />
          <Fragment>
            <Resource
              childProps={{ onClose: handleClose }}
              subject={NS.app('apex/menus/user/menus')}
            />
            <Divider />
          </Fragment>
          <div className={classes.root}>
            <Resource
              childProps={{
                hideIcon: true,
                onClose: handleClose,
              }}
              subject={NS.app('apex/menus/info/menus')}
            />
          </div>
        </Fragment>
      )}
    </AppMenu>
  );
};

MenuNavbar.type = NS.app('Menu');

MenuNavbar.topology = navbarTopology;

export default register(MenuNavbar);
