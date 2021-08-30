import { makeStyles } from '@material-ui/styles';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';

import NavbarNavigationsMenu from './NavbarNavigationsMenu';

import './NavBarContent.scss';

export interface NavBarContentProps {
  children: React.ReactNode;
  hideSearch?: boolean;
  hideMenu?: boolean;
}

const useStyles = makeStyles({
  pusher: {
    flexGrow: 1,
  },
});

const NavBarContent = ({ children, hideSearch, hideMenu }: NavBarContentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <NavbarNavigationsMenu />
      {children}
      <div className="NavBarContent__menus">
        <div className={classes.pusher} />
        <Resource subject={app.c_a} />
        {!hideSearch && (
          <Resource
            subject={app.search}
            onError={() => null}
          />
        )}
        {!hideMenu && <Resource subject={app.menu} />}
      </div>
    </React.Fragment>
  );
};

export default NavBarContent;
