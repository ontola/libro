import {
  WithStyles,
  createStyles,
  withStyles,
} from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { cardFixedTopology } from '../../topologies';
import Topology from '../Topology';

import {
  cardClassIdentifier,
  cardFixedClassIdentifier,
  cardFixedStyles,
  cardStyles,
} from './sharedCardStyles';

const styles = (theme: LibroTheme) => ({
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
});

interface CardFixedProps extends React.PropsWithChildren<WithStyles<typeof styles>> {
  fill?: boolean;
  fixed?: boolean;
  loading?: boolean;
}

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardFixed extends Topology<CardFixedProps> {
  public static defaultProps = {
    fixed: false,
  };

  constructor(props: CardFixedProps) {
    super(props);

    this.topology = cardFixedTopology;
  }

  public getClassName(): string {
    const { classes } = this.props;

    return clsx({
      [cardClassIdentifier]: true,
      [cardFixedClassIdentifier]: true,
      [classes.card]: true,
      [classes.fixed]: true,
      [classes.fill]: this.props.fill,
      [classes.loading]: this.props.loading,
    });
  }
}

export default withStyles(styles)(CardFixed);
