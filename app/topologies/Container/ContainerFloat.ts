import { WithStyles, withStyles } from '@mui/styles';

import { containerFloatTopology } from '../../topologies';
import Topology from '../Topology';

const styles = {
  containerFloat: {
    alignItems: 'center',
    display: 'flex',
  },
};

/**
 * In the top right corner of a container
 * Sets the containerFloat topology
 * @returns {component} Component
 */
class ContainerFloat extends Topology<WithStyles<typeof styles>> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);

    this.className = this.getClassName();
    this.topology = containerFloatTopology;
  }

  public getClassName(): string {
    return this.props.classes.containerFloat;
  }
}

export default withStyles(styles)(ContainerFloat);
