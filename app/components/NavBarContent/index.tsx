import { makeStyles } from '@material-ui/styles';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';

import './NavBarContent.scss';
import NavbarNavigationsMenu from './NavbarNavigationsMenu';

export interface NavBarContentProps {
  children: React.ReactNode;
}

const useStyles = makeStyles({
  pusher: {
    flexGrow: 1,
  },
});

const NavBarContent = ({ children }: NavBarContentProps): JSX.Element => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <NavbarNavigationsMenu />
      {children}
      <div className="NavBarContent__menus">
        <div className={classes.pusher} />
        <Resource subject={app.c_a} />
        <Resource subject={app.search} onError={() => null} />
        <Resource subject={app.menu} />
      </div>
    </React.Fragment>
  );
};

export default NavBarContent;
