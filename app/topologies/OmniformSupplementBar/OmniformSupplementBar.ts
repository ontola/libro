import { TopologyProvider } from 'link-redux';

import { omniformSupplementBarTopology } from '../../topologies';

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
