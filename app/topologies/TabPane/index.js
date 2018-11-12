import { NS } from '../../helpers/LinkedRenderStore';
import TopologyProvider from '../Topology';

export const tabPaneTopology = NS.argu('tabPane');

class TabPane extends TopologyProvider {
  static displayName = 'TabPane';

  constructor(props) {
    super(props);

    this.topology = tabPaneTopology;
  }
}

export default TabPane;
