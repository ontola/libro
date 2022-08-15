import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { TopologyFC } from '../../../Kernel/lib/topology';
import { cardMainTopology } from '../index';

import {
  cardClassIdentifier,
  cardFixedClassIdentifier,
  cardFixedStyles,
  cardStyles,
} from './sharedCardStyles';

export interface CardMainProps {
  fixed?: boolean;
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  ...cardStyles(theme),
  ...cardFixedStyles(theme),
}));

/**
 * Renders an empty Card without padding
 */
const CardMain: TopologyFC<CardMainProps> = ({ children, fixed }) => {
  const [CardMainTopology] = useTopologyProvider(cardMainTopology);
  const classes = useStyles();

  const className = clsx({
    [cardClassIdentifier]: true,
    [classes.card]: true,
    [cardFixedClassIdentifier]: fixed,
    [classes.fixed]: fixed,
  });

  return (
    <CardMainTopology>
      <div className={className}>
        {children}
      </div>
    </CardMainTopology>
  );
};

export default CardMain;
