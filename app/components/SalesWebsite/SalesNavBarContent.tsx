import IconButton from '@mui/material/IconButton';
import { Menu } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Property, Resource } from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import sales from '../../ontology/sales';
import { BreakPoints, LibroTheme } from '../../themes/themes';
import { useWebsiteIRI } from '../../hooks/useWebsiteIRI';

import { SalesNavBarDrawer } from './SalesNavBarDrawer';

const LOGO_MARGIN_COMPENSATION = 4;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  button: {
    display: 'none',
    fontSize: '1rem',
    [theme.breakpoints.down(BreakPoints.Medium)]: {
      display: 'block',
    },
  },
  cta: {
    alignItems: 'center',
    display: 'flex',

    [theme.breakpoints.down(BreakPoints.Medium)]: {
      display: 'none',
    },
  },
  navBar: {
    '& img': {
      width: '4.3rem',
      [theme.breakpoints.down(BreakPoints.Medium)]: {
        marginRight: theme.spacing(LOGO_MARGIN_COMPENSATION),
      },
    },

    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    height: '64px',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: theme.breakpoints.values.lg,
    overflowY: 'hidden',
    paddingLeft: '0.5625rem',
    paddingRight: '0.5625rem',
    width: '100%',
  },
}));

const SalesNavBarContent = (): JSX.Element => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const websiteIRI = useWebsiteIRI();

  const handleDrawerButtonClick = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
      <Resource
        forceRender
        subject={websiteIRI}
      >
        <Property label={ontola.navigationsMenu}>
          <div className={classes.navBar}>
            <Property label={ontola.menuItems} />
            <span className={classes.cta}>
              <Property
                label={sales.callToAction}
                size="small"
              />
            </span>
          </div>
          <IconButton
            className={classes.button}
            onClick={handleDrawerButtonClick}
          >
            <Menu />
          </IconButton>
        </Property>
      </Resource>
      <SalesNavBarDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
      />
    </React.Fragment>
  );
};

export default SalesNavBarContent;
