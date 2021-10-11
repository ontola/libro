import { WithStyles } from '@material-ui/core/styles';
import { createStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export enum CardListDirection {
  Column = 'column',
}

export interface CardListProps {
  direction?: CardListDirection;
  overflow?: boolean;
  wrap?: boolean;
}

/**
 * A list inside a CardContent
 */
export const cardListTopology = argu.cardList;

const styles = createStyles({
  cardList: {
    display: 'flex',
  },
  column: {
    flexDirection: 'column',
  },
  overflow: {
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  wrap: {
    flexWrap: 'wrap',
  },
});

type PropType = CardListProps & WithStyles<typeof styles>;

/**
 * Sets the cardList topology
 * @returns {component} Component
 */
class CardList extends Topology<PropType> {
  constructor(props: PropType) {
    super(props);

    this.topology = cardListTopology;
  }

  public getClassName(): string {
    const { classes } = this.props;

    return clsx({
      [classes.cardList]: true,
      [classes.column]: this.props.direction === CardListDirection.Column,
      [classes.overflow]: this.props.overflow,
      [classes.wrap]: this.props.wrap,
    });
  }
}

export default withStyles(styles)(CardList);
