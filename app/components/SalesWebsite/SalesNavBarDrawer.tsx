import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Property, Resource } from 'link-redux';
import React from 'react';

import { frontendIRI } from '../../ontology/app';
import ontola from '../../ontology/ontola';
import sales from '../../ontology/sales';
import { SalesTheme } from '../../themes/salesWebsite/SalesThemeProvider';

const DRAWER_PADDING = 5;

export interface SalesNavBarDrawerProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles<SalesTheme>((theme) => ({
  drawerContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(DRAWER_PADDING),
  },
}));

export const SalesNavBarDrawer = ({ open, onClose }: SalesNavBarDrawerProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme<SalesTheme>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchor, setAnchor] = React.useState<'top' | 'bottom'>('top');

  React.useEffect(() => {
    setAnchor(isSmallScreen ? 'bottom' : 'top');

  }, [isSmallScreen]);

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose}>
      <Resource forceRender subject={frontendIRI}>
        <Property label={ontola.navigationsMenu}>
          <div className={classes.drawerContainer}>
            <Property label={ontola.menuItems} />
            <span>
              <Property label={sales.callToAction} size="small" />
            </span>
          </div>
        </Property>
      </Resource>
    </Drawer>
  );
};
