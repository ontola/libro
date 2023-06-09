import {
  AppBar,
  Container,
  Toolbar, 
} from '@mui/material';
import {
  createStyles,
  makeStyles,
  useTheme, 
} from '@mui/styles';
import clsx from 'clsx';
import {
  TopologyFC,
  createTopologyProvider,
  useLinkRenderContext, 
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { landmarkMessages } from '../../../../translations/messages';
import { LibroTheme } from '../../../Kernel/lib/themes';
import { navbarTopology } from '../index';

interface NavbarProps {
  classes?: Partial<ReturnType<typeof useStyles>>;
  fullWidth?: boolean;
  elevated?: boolean;
}

type MaterialMaxWidthType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

const useStyles = makeStyles((theme: LibroTheme) => (createStyles({
  elevated: {
    boxShadow: '0px 0px 17px rgba(0, 0, 0, 0.1)',
  },
  root: {
    display: 'block',
  },
  toolbar: {},
  wrapper: {
    color: theme.appBar.resolveColor(),
    zIndex: theme.zIndex.appBar + 1,
  },
})));

const NavBarTopology = createTopologyProvider(navbarTopology);

const Navbar: TopologyFC<NavbarProps> = ({
  children, elevated, fullWidth, classes,
}) => {
  const ownClasses = useStyles();
  const { subject } = useLinkRenderContext();

  const mergedClasses = {
    ...ownClasses,
    ...classes,
  };

  const intl = useIntl();

  const {
    appBar: {
      maxWidth,
      background,
      height,
      position,
    },
  } = useTheme<LibroTheme>();

  const appBarClassName = clsx({
    [mergedClasses.wrapper]: true,
    [mergedClasses.elevated]: elevated,
  });

  const ToolbarWrapper = fullWidth ? React.Fragment : Container;
  const toolbarWrapperProps = fullWidth ? {} : { maxWidth } as { maxWidth: MaterialMaxWidthType; };

  return (
    <NavBarTopology>
      <AppBar
        className={appBarClassName}
        color={background as any}
        elevation={0}
        position={position as any}
        resource={subject?.value}
      >
        <nav
          aria-label={intl.formatMessage(landmarkMessages.navigationBar)}
          role="navigation"
        >
          <ToolbarWrapper {...toolbarWrapperProps}>
            <Toolbar
              disableGutters
              classes={{ root: mergedClasses.root }}
              variant="dense"
            >
              {children}
            </Toolbar>
          </ToolbarWrapper>
        </nav>
      </AppBar>
      {position === 'fixed' && <div style={{ height }} />}
    </NavBarTopology>
  );
};

export default Navbar;
