import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Property, Resource } from 'link-redux';
import React from 'react';

import { frontendIRI } from '../../ontology/app';
import ontola from '../../ontology/ontola';

export const navBarContentItemsCID = 'CID-NavBarContentItems';

const useStyles = makeStyles({
  itemPusher: {
    display: 'flex',
    height: '100%',
  },
  navBarContentItems: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    height: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
  },
});

const NavbarNavigationsMenu = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        navBarContentItemsCID,
        classes.navBarContentItems,
      )}
    >
      <div className={classes.itemPusher} />
      <Resource
        forceRender
        subject={frontendIRI}
      >
        <Property label={ontola.navigationsMenu}>
          <Property label={ontola.menuItems} />
        </Property>
      </Resource>
    </div>
  );
};

export default NavbarNavigationsMenu;
