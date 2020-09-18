import argu from '../../ontology/argu';
import Topology from '../Topology';

export const pageTopology = argu.page;

export class Page extends Topology {
  constructor(props: {}) {
    super(props);

    this.topology = pageTopology;
    this.className = 'Page';
  }
}
