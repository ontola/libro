import { WithStyles, withStyles } from '@material-ui/styles';

import argu from '../../ontology/argu';
import Topology from '../Topology';

/**
 * In the top right corner of a container
 */
export const containerFloatTopology = argu.ns('containerFloat');

const styles = {
  containerFloat : {
    alignItems: 'center',
    display: 'flex',
  },
};

/**
 * Sets the containerFloat topology
 * @returns {component} Component
 */
class ContainerFloat extends Topology<WithStyles<typeof styles>> {

  constructor(props: WithStyles<typeof styles>) {
    super(props);

    this.className = props.classes.containerFloat;
    this.topology = containerFloatTopology;
  }
}

export default withStyles(styles)(ContainerFloat);
