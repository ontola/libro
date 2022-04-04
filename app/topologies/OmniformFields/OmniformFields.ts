import { TopologyProvider } from 'link-redux';

import { omniformFieldsTopology } from '../../topologies';

class OmniformFields extends TopologyProvider {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = omniformFieldsTopology;
  }

  public render() {
    return this.wrap(this.props.children);
  }
}

export default OmniformFields;
