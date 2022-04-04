import { tabPaneTopology } from '../../topologies';
import TopologyProvider from '../Topology';

class TabPane extends TopologyProvider {
  public static displayName = 'TabPane';

  constructor(props: Record<string, unknown>) {
    super(props);

    this.topology = tabPaneTopology;
  }
}

export default TabPane;
