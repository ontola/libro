import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Select.scss';

export const selectTopology = argu.ns('select');

class Select<P> extends Topology<P> {
  constructor(props: P) {
    super(props);

    this.elementType = 'ul';
    this.topology = selectTopology;
  }
}

export default Select;
