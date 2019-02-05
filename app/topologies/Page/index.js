import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

import './Page.scss';

export const pageTopology = NS.argu('page');

export class Page extends Topology {
  constructor(props) {
    super(props);

    this.topology = pageTopology;
    this.className = 'Page';
  }
}
