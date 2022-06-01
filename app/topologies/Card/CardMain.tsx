import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTopologyProvider } from 'link-redux';

import { LibroTheme } from '../../themes/themes';
import { cardMainTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

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
