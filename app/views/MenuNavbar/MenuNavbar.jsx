import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuClose from '@material-ui/icons/Close';
import MenuOpen from '@material-ui/icons/Menu';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  LinkedResourceContainer,
  register,
} from 'link-redux';
import * as PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { NS } from '../../helpers/LinkedRenderStore';
import { getCurrentUserType } from '../../state/app/selectors';
import variables from '../../themes/common/variables';
import AppMenu from '../../topologies/AppMenu';
import { navbarTopology } from '../../topologies/Navbar';

const mapDataToProps = state => ({
  showUserMenu: ['ConfirmedUser', 'UnconfirmedUser'].includes(getCurrentUserType(state)),
});

const useStyles = makeStyles({
  button: {
    borderRadius: '0',
    minWidth: 'auto',
    padding: '.5rem 1rem',
  },
  root: {
    backgroundColor: variables.grey.xxLight,
  },
});

const MenuNavbar = ({
  showUserMenu,
}) => {
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
          <LinkedResourceContainer
            childProps={{
              hideIcon: true,
              onClose: handleClose,
            }}
            subject={NS.app('menus/navigations/menus')}
          />
          <Divider />
          {showUserMenu && (
            <Fragment>
              <LinkedResourceContainer
                childProps={{ onClose: handleClose }}
                subject={NS.app('apex/menus/user/menus')}
              />
              <Divider />
            </Fragment>
          )}
          <div className={classes.root}>
            <LinkedResourceContainer
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

MenuNavbar.hocs = [connect(mapDataToProps)];

MenuNavbar.propTypes = {
  showUserMenu: PropTypes.bool,
};

export default register(MenuNavbar);
