import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import { Property, Resource } from 'link-redux';
import React from 'react';
import { Menu } from '@material-ui/icons';

import { frontendIRI } from '../../ontology/app';
import ontola from '../../ontology/ontola';
import sales from '../../ontology/sales';
import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';
import '../NavBarContent/NavBarContent.scss';

import { SalesNavBarDrawer } from './SalesNavBarDrawer';

const useStyles = makeStyles<SalesTheme>((theme) => ({
  button: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  cta: {
    alignItems: 'center',
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navBar: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '43px',
    justifyContent: 'space-between',
    overflowY: 'hidden',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
    },
  },
}));

const SalesNavBarContent = (): JSX.Element => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerButtonClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
      <Resource forceRender subject={frontendIRI}>
        <Property label={ontola.navigationsMenu}>
          <div className={classes.navBar}>
            <Property label={ontola.menuItems} />
            <span className={classes.cta}>
              <Property label={sales.callToAction} size="small" />
            </span>
          </div>
          <IconButton className={classes.button} onClick={handleDrawerButtonClick}>
            <Menu />
          </IconButton>
        </Property>
      </Resource>
      <SalesNavBarDrawer open={drawerOpen} onClose={handleDrawerClose} />
    </React.Fragment>
  );
};

export default SalesNavBarContent;
