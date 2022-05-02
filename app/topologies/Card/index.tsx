import {
  WithStyles,
  createStyles,
  withStyles,
} from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { cardTopology } from '../../topologies';
import Topology from '../Topology';

import {
  cardClassIdentifier,
  cardStyles,
  shineStyles,
} from './sharedCardStyles';

type CardElementProps = {
  'data-testid': 'card';
  onClick: any;
};

const styles = (theme: LibroTheme) => ({
  ...createStyles({
    warn: {
      border: `2px solid ${theme.palette.red.dark}`,
    },
  }),
  ...cardStyles(theme),
  ...shineStyles,
});

interface CardProps extends React.PropsWithChildren<WithStyles<typeof styles>>{
  about?: string;
  className?: string;
  fixed?: boolean;
  onClick?: any;
  shine?: boolean;
  warn?: boolean;
}

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class Card extends Topology<CardProps> {
  public static defaultProps = {
    fixed: false,
    shine: false,
    warn: false,
  };

  constructor(props: CardProps) {
    super(props);

    this.topology = cardTopology;
  }

  public getClassName(): string {
    const { classes } = this.props;

    return clsx({
      [cardClassIdentifier]: true,
      [classes.card]: true,
      [classes.shine]: this.props.shine,
      [classes.warn]: this.props.warn,
      [this.props.className!]: this.props.className,
    });
  }

  public getElementProps(): CardElementProps {
    return {
      'data-testid': 'card',
      onClick: this.props.onClick,
    };
  }
}

export { default as CardAppendix } from './CardAppendix';
export { default as CardFixed } from './CardFixed';
export { default as CardFloat } from './CardFloat';
export { default as CardMicroRow } from './CardMicroRow';
export { default as CardRow } from './CardRow';
export { default as CardMain } from './CardMain';

export default withStyles(styles)(Card);
