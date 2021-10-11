import { WithStyles } from '@material-ui/core/styles';
import { createStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';
import Topology from '../Topology';

import {
  cardClassIdentifier,
  cardStyles,
  shineStyles,
} from './sharedCardStyles';

export const cardTopology = argu.card;

interface CardProps {
  about?: string;
  className?: string;
  fixed?: boolean;
  onClick?: any;
  shine?: boolean;
  warn?: boolean;
}

type CardElementProps = {
  onClick: any;
};

const styles = (theme: LibroTheme) => ({
  ...createStyles({
    warn: {
      // @ts-ignore
      border: `2px solid ${theme.palette.red.dark}`,
    },
  }),
  ...cardStyles(theme),
  ...shineStyles,
});

type PropType = CardProps & WithStyles<typeof styles>;

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class Card extends Topology<PropType> {
  public static defaultProps = {
    fixed: false,
    shine: false,
    warn: false,
  };

  constructor(props: PropType) {
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
      onClick: this.props.onClick,
    };
  }
}

export { default as CardAppendix } from './CardAppendix';
export { default as CardFixed } from './CardFixed';
export { default as CardFloat } from './CardFloat';
export { default as CardList } from './CardList';
export { default as CardMicroRow } from './CardMicroRow';
export { default as CardRow } from './CardRow';
export { default as CardMain } from './CardMain';

export default withStyles(styles)(Card);
