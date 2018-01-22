import { TopologyProvider } from 'link-redux';

import { NS } from '../../helpers/LinkedRenderStore';

import './Widget.scss';

class WidgetTopology extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('widget');
    this.className = 'Widget';
  }
}

export default WidgetTopology;
