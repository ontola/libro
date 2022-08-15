import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { FC, register } from 'link-redux';
import React from 'react';

import { loadingStyles } from '../../Common/components/Loading';
import { LibroTheme } from '../../Kernel/lib/themes';
import ll from '../../Kernel/ontology/ll';
import { navbarTopology } from '../topologies';

const useStyles = makeStyles<LibroTheme>((theme) => ({
  ...loadingStyles(theme),
  loadingNavbarLink: {
    alignItems: 'center',
    display: 'flex',
    height: '2em',
  },
  loadingNavbarLinkBackground: {
    flexGrow: 1,
    height: '1em',
    marginLeft: '2em',
    marginRight: '2.4em',
  },
}));

const LoadingNavbar: FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.loadingNavbarLink}>
      <div
        className={clsx(
          classes.loadingBackground,
          classes.loadingNavbarLinkBackground,
          classes.loadingBackgroundInverse,
        )}
      />
    </div>
  );
};

LoadingNavbar.type = ll.LoadingResource;

LoadingNavbar.topology = navbarTopology;

export default register(LoadingNavbar);
