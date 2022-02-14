import { makeStyles } from '@material-ui/styles';
import { Property, Resource } from 'link-redux';
import React from 'react';

import { frontendIRI } from '../../ontology/app';
import ontola from '../../ontology/ontola';

const useStyles = makeStyles({
  itemPusher: {
    display: 'flex',
    height: '100%',
  },
});

const NavbarNavigationsMenu = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className="NavBarContent__items">
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
