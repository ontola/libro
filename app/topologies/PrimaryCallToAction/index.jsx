import ontola from '../../ontology/ontola';
import Topology from '../Topology';

import './PrimaryCallToAction.scss';

export const primaryCallToActionTopology = ontola.ns('topologies/primaryCallToAction');

export class PrimaryCallToAction extends Topology {
  constructor(props) {
    super(props);

    this.topology = primaryCallToActionTopology;
    this.className = 'PrimaryCallToAction';
  }
}
