import argu from '../../ontology/argu';
import Topology from '../Topology';

export const parentTopology = argu.ns('parent');

class Parent extends Topology {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = parentTopology;
  }
}

export default Parent;
