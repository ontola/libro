import {
  WithStyles,
  createStyles,
  withStyles, 
} from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { cardMicroRowTopology } from '../../topologies';
import Topology from '../Topology';

import { collapseTextToggleCID, shineStyles } from './sharedCardStyles';

export const cardMicroRowClassIdentifier = 'CID-CardMicroRow';

const styles = (theme: LibroTheme) => ({
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
});

export interface CardMicroRowProps extends React.PropsWithChildren<WithStyles<typeof styles>> {
  highlighted?: boolean;
}

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardMicroRow extends Topology<CardMicroRowProps> {
  constructor(props: CardMicroRowProps) {
    super(props);

    this.topology = cardMicroRowTopology;
  }

  public getClassName(): string {
    const { classes } = this.props;

    return clsx({
      [cardMicroRowClassIdentifier]: true,
      [classes.cardMicroRow]: true,
      [classes.shine]: this.props.highlighted,
    });
  }
}

export default withStyles(styles)(CardMicroRow);
