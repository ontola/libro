import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Property, Resource } from 'link-redux';
import React from 'react';

import { frontendIRI } from '../../ontology/app';
import ontola from '../../ontology/ontola';
import sales from '../../ontology/sales';
import { LibroTheme } from '../../themes/themes';

const DRAWER_PADDING = 5;

export interface SalesNavBarDrawerProps {
  open: boolean;
  onClose: () => void;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  drawerContainer: {
    '& img': {
      margin: 'auto',
      maxWidth: '40%',
    },
    '& picture': {
      display: 'flex',
    },
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(DRAWER_PADDING),
  },
}));

export const SalesNavBarDrawer = ({ open, onClose }: SalesNavBarDrawerProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme<LibroTheme>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchor, setAnchor] = React.useState<'top' | 'bottom'>('top');

  React.useEffect(() => {
    setAnchor(isSmallScreen ? 'bottom' : 'top');

  }, [isSmallScreen]);

  const handleInteraction = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    onClose();
  };

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
    >
      <Resource
        forceRender
        subject={frontendIRI}
      >
        <Property label={ontola.navigationsMenu}>
          <div
            className={classes.drawerContainer}
            onClick={handleInteraction}
            onKeyDown={handleInteraction}
          >
            <Property label={ontola.menuItems} />
            <span>
              <Property
                label={sales.callToAction}
                size="small"
              />
            </span>
          </div>
        </Property>
      </Resource>
    </Drawer>
  );
};
