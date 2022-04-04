import { pageTopology } from '../../topologies';
import Topology from '../Topology';

export class Page extends Topology {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = pageTopology;
    this.className = 'Page';
  }
}
