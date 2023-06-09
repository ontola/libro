import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { cardMicroRowTopology } from '../index';

import { collapseTextToggleCID, shineStyles } from './sharedCardStyles';

export const cardMicroRowClassIdentifier = 'CID-CardMicroRow';

export interface CardMicroRowProps {
  highlighted?: boolean;
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  ...createStyles({
    cardMicroRow: {
      '& .Link': {
        '&:hover': {
          textDecoration: 'underline',
        },
        fontStyle: 'italic',
      },
      fontSize: '.9em',
      padding: '.3rem 1.3rem',
      [`& .${collapseTextToggleCID}`]: {
        background: `linear-gradient(to bottom, ${theme.palette.transparent.main} 0%, ${theme.palette.grey.xxLight} 30%, ${theme.palette.grey.xxLight} 100%)`,
      },
    },
  }),
  ...shineStyles,
}));

const CardMicroRowTopology = createTopologyProvider(cardMicroRowTopology);

/**
 * Used to divide a card in multiple rows
 */
const CardMicroRow: TopologyFC<CardMicroRowProps> = ({ children, highlighted }) => {
  const classes = useStyles();
  const className = clsx({
    [cardMicroRowClassIdentifier]: true,
    [classes.cardMicroRow]: true,
    [classes.shine]: highlighted,
  });

  return (
    <CardMicroRowTopology>
      <div className={className}>
        {children}
      </div>
    </CardMicroRowTopology>
  );
};

export default CardMicroRow;
