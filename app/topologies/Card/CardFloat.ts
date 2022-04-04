import {
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/styles';

import { cardFloatTopology } from '../../topologies';
import Topology from '../Topology';

const styles = createStyles({
  cardFloat: {
    alignItems: 'center',
    display: 'flex',
  },
});

/**
 * In the top right corner of a card
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
