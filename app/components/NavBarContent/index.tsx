import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Resource } from 'link-redux';
import React from 'react';

import app from '../../ontology/app';

import { ManageOrganisationMenu } from './ManageOrganisationMenu';
import NavbarNavigationsMenu from './NavbarNavigationsMenu';

export interface NavBarContentProps {
  children: React.ReactNode;
  hideSearch?: boolean;
  hideMenu?: boolean;
}

export const navBarContentMenusCID = 'CID-NavBarContentMenus';

const useStyles = makeStyles({
  navBarContentMenus: {
    display: 'flex',
    flexShrink: 1,
    height: '100%',
  },
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
      <div
        className={clsx(
          navBarContentMenusCID,
          classes.navBarContentMenus,
        )}
      >
        <div className={classes.pusher} />
        <ManageOrganisationMenu />
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
