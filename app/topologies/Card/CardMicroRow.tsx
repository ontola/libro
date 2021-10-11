import {
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/styles';
import clsx from 'clsx';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import { shineStyles } from './sharedCardStyles';

export const cardMicroRowClassIdentifier = 'CID-CardMicroRow';

export const cardMicroRowTopology = argu.ns('cardMicroRow');

export interface CardMicroRowProps {
  highlighted?: boolean;
}

const styles = {
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
    },
  }),
  ...shineStyles,
};

type PropType = CardMicroRowProps & WithStyles<typeof styles>;

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardMicroRow extends Topology<PropType> {
  constructor(props: PropType) {
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
