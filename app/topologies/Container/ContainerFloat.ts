import argu from '../../ontology/argu';
import Topology from '../Topology';

/**
 * In the top right corner of a container
 */
export const containerFloatTopology = argu.ns('containerFloat');

export interface ContainerFloatProps {
  children: React.ReactNode
}

/**
 * Sets the containerFloat topology
 * @returns {component} Component
 */
class ContainerFloat extends Topology<ContainerFloatProps> {

  constructor(props: ContainerFloatProps) {
    super(props);

    this.className = 'ContainerFloat';
    this.topology = containerFloatTopology;
  }
}

export default ContainerFloat;
