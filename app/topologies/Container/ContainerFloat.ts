import { WithStyles, withStyles } from '@material-ui/styles';
import clsx from 'clsx';

import argu from '../../ontology/argu';
import Topology from '../Topology';

/**
 * In the top right corner of a container
 */
export const containerFloatTopology = argu.ns('containerFloat');
const containerFloatCID = 'CID-ContainerFloat';

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

  public getClassName(): string {
    const { classes } = this.props;

    return clsx({
      [containerFloatCID]: true,
      [classes.containerFloat]: true,
    });
  }
}

export default withStyles(styles)(ContainerFloat);
