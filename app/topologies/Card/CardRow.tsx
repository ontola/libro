import { WithStyles } from '@material-ui/core/styles';
import { createStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { collapseTextToggleCID } from '../../components/CollapseText';
import argu from '../../ontology/argu';
import { LibroTheme } from '../../themes/themes';
import Topology from '../Topology';

import { cardClassIdentifier, greyBorder } from './sharedCardStyles';

export const cardRowClassIdentifier = 'CID-CardRow';
export const cardRowBackdropClassIdentifier = 'CID-CardRowBackdrop';

export const cardRowTopology = argu.ns('cardRow');

export interface CardRowProps {
  backdrop?: boolean;
  borderTop?: boolean;
  showArrow?: boolean;
}

const styles = (theme: LibroTheme) => createStyles({
  backdrop: {
    backgroundColor: theme.palette.grey.xxLight,
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
    borderTop: greyBorder(theme),
  },
});

type PropType = CardRowProps & WithStyles<typeof styles>;

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardRow extends Topology<PropType> {
  constructor(props: PropType) {
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
