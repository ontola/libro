import {
  WithStyles,
  createStyles,
  withStyles, 
} from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { cardRowTopology } from '../../topologies';
import Topology from '../Topology';

import { cardClassIdentifier, collapseTextToggleCID } from './sharedCardStyles';

export const cardRowClassIdentifier = 'CID-CardRow';
export const cardRowBackdropClassIdentifier = 'CID-CardRowBackdrop';

const styles = (theme: LibroTheme) => createStyles({
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
});

interface CardRowProps extends React.PropsWithChildren<WithStyles<typeof styles>>{
  backdrop?: boolean;
  borderTop?: boolean;
  showArrow?: boolean;
}

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardRow extends Topology<CardRowProps> {
  constructor(props: CardRowProps) {
    super(props);

    this.topology = cardRowTopology;
  }
  public getElementProps(): Record<string, unknown> {
    return { 'data-testid': 'card-row' };
  }

  public getClassName(): string {
    const { classes } = this.props;

    return clsx({
      [cardRowBackdropClassIdentifier]: this.props.backdrop,
      [classes.backdrop]: this.props.backdrop,
      [cardRowClassIdentifier]: true,
      [classes.cardRow]: true,
      [classes.topBorder]: this.props.borderTop,
    });
  }
}

export default withStyles(styles)(CardRow);
