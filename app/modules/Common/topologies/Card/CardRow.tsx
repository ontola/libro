import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../theme/types';
import { TopologyFC } from '../../../Core/lib/topology';
import libro from '../../../Core/ontology/libro';

import { cardClassIdentifier, collapseTextToggleCID } from './sharedCardStyles';

export const cardRowTopology = libro.topologies.cardRow;
export const cardRowClassIdentifier = 'CID-CardRow';
export const cardRowBackdropClassIdentifier = 'CID-CardRowBackdrop';

export interface CardRowProps {
  backdrop?: boolean;
  borderTop?: boolean;
}

const useStyles = makeStyles((theme: LibroTheme) => createStyles({
  backdrop: {
    backgroundColor: theme.palette.background.paper,
    [`& .${collapseTextToggleCID}`]: {
      background: `linear-gradient(to bottom, ${theme.palette.transparent.main} 0%, ${theme.palette.grey.xxLight} 30%, ${theme.palette.grey.xxLight} 100%)`,
    },
  },
  cardRow: {
    '& &': {
      borderLeft: `solid 8px ${theme.palette.grey.xLight}`,
    },
    '&:last-child, &:last-of-type': {
      borderBottom: 0,
    },
    position: 'relative',
  },
  topBorder: {
    [`.${cardClassIdentifier} > &:first-child`]: {
      borderTop: 0,
    },
    borderTop: theme.greyBorder,
  },
}));

/**
 * Used to divide a card in multiple rows
 */
const CardRow: TopologyFC<CardRowProps> = ({ children, backdrop, borderTop }) => {
  const [CardRowTopology] = useTopologyProvider(cardRowTopology);
  const classes = useStyles();
  const className = clsx({
    [cardRowBackdropClassIdentifier]: backdrop,
    [classes.backdrop]: backdrop,
    [cardRowClassIdentifier]: true,
    [classes.cardRow]: true,
    [classes.topBorder]: borderTop,
  });

  return (
    <CardRowTopology>
      <div className={className}>
        {children}
      </div>
    </CardRowTopology>
  );
};

export default CardRow;
