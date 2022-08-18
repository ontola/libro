import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import {
  TopologyFC,
  createTopologyProvider,
  useLinkRenderContext, 
} from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import libro from '../../../Kernel/ontology/libro';

import {
  cardClassIdentifier,
  cardFixedClassIdentifier,
  cardFixedStyles,
  cardStyles, 
} from './sharedCardStyles';

export const cardFixedTopology = libro.topologies.cardFixed;

export interface CardFixedProps {
  fill?: boolean;
  loading?: boolean;
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  ...cardStyles(theme),
  ...cardFixedStyles(theme),
  ...createStyles({
    fill: {
      height: '100%',
      margin: 0,
      width: '100%',
    },
    loading: {
      margin: '0rem 0.5625rem',
    },
  }),
}));

const CardFixedTopology = createTopologyProvider(cardFixedTopology);

/**
 * Renders an empty Card without padding
 */
const CardFixed: TopologyFC<CardFixedProps> = ({
  children, fill, loading,
}) => {
  const { subject } = useLinkRenderContext();
  const classes = useStyles();

  const className = clsx({
    [cardClassIdentifier]: true,
    [cardFixedClassIdentifier]: true,
    [classes.card]: true,
    [classes.fixed]: true,
    [classes.fill]: fill,
    [classes.loading]: loading,
  });

  return (
    <CardFixedTopology>
      <div
        className={className}
        resource={subject?.value}
      >
        {children}
      </div>
    </CardFixedTopology>
  );
};

export default CardFixed;

