import {
  WithStyles,
  createStyles,
  withStyles,
} from '@mui/styles';

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

    this.className = this.getClassName();
    this.topology = cardFloatTopology;
  }

  public getClassName(): string {
    return this.props.classes.cardFloat;
  }
}

export default withStyles(styles)(CardFloat);
