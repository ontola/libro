import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

import './PrimaryCallToAction.scss';

export const primaryCallToActionTopology = NS.ontola('topologies/primaryCallToAction');

export class PrimaryCallToAction extends Topology {
  constructor(props) {
    super(props);

    this.topology = primaryCallToActionTopology;
    this.className = 'PrimaryCallToAction';
  }
}
