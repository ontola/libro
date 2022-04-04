import { WithStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { LibroTheme } from '../../themes/themes';
import { cardMainTopology } from '../../topologies';
import Topology from '../Topology';

import {
  cardClassIdentifier,
  cardFixedClassIdentifier,
  cardFixedStyles,
  cardStyles,
} from './sharedCardStyles';

export interface CardMainProps {
  fixed?: boolean;
}

const styles = (theme: LibroTheme) => ({
  ...cardStyles(theme),
  ...cardFixedStyles(theme),
});

type PropType = CardMainProps & WithStyles<typeof styles>;

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardMain extends Topology<PropType> {
  public static defaultProps = {
    fixed: false,
  };

  constructor(props: PropType) {
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
