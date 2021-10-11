import {
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/styles';

import argu from '../../ontology/argu';
import Topology from '../Topology';

/**
 * In the top right corner of a card
 */
export const cardFloatTopology = argu.ns('cardFloat');

const styles = createStyles({
  cardFloat: {
    alignItems: 'center',
    display: 'flex',
  },
});

/**
 * Sets the cardFloat topology
 * @returns {component} Component
 */
class CardFloat extends Topology<WithStyles<typeof styles>> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);

    this.className = this.props.classes.cardFloat;
    this.topology = cardFloatTopology;
  }
}

export default withStyles(styles)(CardFloat);
