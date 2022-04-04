import { TopologyProvider } from 'link-redux';

import { selectedValueTopology } from '../../topologies';

class SelectedValue extends TopologyProvider {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = selectedValueTopology;
  }
}

export default SelectedValue;
