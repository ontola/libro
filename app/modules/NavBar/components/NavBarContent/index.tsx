import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { Resource } from 'link-redux';
import React, { ChildrenProp } from 'react';

import app from '../../../Common/ontology/app';

import { ManageOrganisationMenu } from './ManageOrganisationMenu';
import NavbarNavigationsMenu from './NavbarNavigationsMenu';

export interface NavBarContentProps {
  hideSearch?: boolean;
  hideMenu?: boolean;
}

export const navBarContentMenusCID = 'CID-NavBarContentMenus';

const useStyles = makeStyles({
  navBarContent: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
  navBarContentMenus: {
    display: 'flex',
    height: '100%',
  },
});

const NavBarContent: React.FC<NavBarContentProps & ChildrenProp> = ({ children, hideSearch, hideMenu }): JSX.Element => {
  const classes = useStyles();
  const navBarRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className={classes.navBarContent}
      ref={navBarRef}
    >
      <NavbarNavigationsMenu
        navBarRef={navBarRef}
      />
      {children}
      <div
        className={clsx(
          navBarContentMenusCID,
          classes.navBarContentMenus,
        )}
      >
        <ManageOrganisationMenu />
        {!hideSearch && (
          <Resource
            subject={app.search}
            onError={() => null}
          />
        )}
        {!hideMenu && <Resource subject={app.menu} />}
      </div>
    </div>
  );
};

export default NavBarContent;
