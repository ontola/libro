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
    <Resource
      forceRender
      subject={frontendIRI}
    >
      <Property label={ontola.navigationsMenu}>
        <div className="NavBarContent__items">
          <div className={classes.itemPusher} />
          <Property label={ontola.menuItems} />
        </div>
      </Property>
    </Resource>
  );
};

export default NavbarNavigationsMenu;