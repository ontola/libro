import { TopologyProvider } from 'link-redux';

import argu from '../../ontology/argu';

export const omniformSupplementBarTopology = argu.ns('omniformSupplementBar');

class OmniformSupplementBar extends TopologyProvider {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = omniformSupplementBarTopology;
  }

  public render() {
    return this.wrap(this.props.children);
  }
}

export default OmniformSupplementBar;
