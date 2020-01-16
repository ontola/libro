import argu from '../../ontology/argu';
import TopologyProvider from '../Topology';

export const tabPaneTopology = argu.ns('tabPane');

class TabPane extends TopologyProvider {
  static displayName = 'TabPane';

  constructor(props) {
    super(props);

    this.topology = tabPaneTopology;
  }
}

export default TabPane;
