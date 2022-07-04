import Drawer from '@mui/material/Drawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles, useTheme } from '@mui/styles';
import { Property, Resource } from 'link-redux';
import React from 'react';

import { BreakPoints, LibroTheme } from '../../Kernel/lib/themes';
import { useWebsiteIRI } from '../../Kernel/hooks/useWebsiteIRI';
import ontola from '../../Kernel/ontology/ontola';
import sales from '../ontology/sales';

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
  const websiteIRI = useWebsiteIRI();

  const screenIsNarrow = useMediaQuery(theme.breakpoints.down(BreakPoints.Small));
  const [anchor, setAnchor] = React.useState<'top' | 'bottom'>('top');

  React.useEffect(() => {
    setAnchor(screenIsNarrow ? 'bottom' : 'top');

  }, [screenIsNarrow]);

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
        subject={websiteIRI}
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
