import {
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import clsx from 'clsx';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';
import Topology from '../Topology';

import {
  cardClassIdentifier,
  cardFixedClassIdentifier,
  cardFixedStyles,
  cardStyles,
} from './sharedCardStyles';

export const cardFixedTopology = argu.cardFixed;

export interface CardFixedProps {
  fill?: boolean;
  fixed?: boolean;
  loading?: boolean;
}

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

type PropType = CardFixedProps & WithStyles<typeof styles>;

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardFixed extends Topology<PropType> {
  public static defaultProps = {
    fixed: false,
  };

  constructor(props: PropType) {
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
