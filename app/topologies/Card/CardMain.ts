import { WithStyles, withStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';

import { LibroTheme } from '../../themes/themes';
import { cardMainTopology } from '../../topologies';
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
});

interface CardMainProps extends React.PropsWithChildren<WithStyles<typeof styles>> {
  fixed?: boolean;
}

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardMain extends Topology<CardMainProps> {
  public static defaultProps = {
    fixed: false,
  };

  constructor(props: CardMainProps) {
    super(props);

    this.topology = cardMainTopology;
  }

  public getClassName(): string {
    const { classes } = this.props;

    return clsx({
      [cardClassIdentifier]: true,
      [classes.card]: true,
      [cardFixedClassIdentifier]: this.props.fixed,
      [classes.fixed]: this.props.fixed,
    });
  }
}

export default withStyles(styles)(CardMain);
