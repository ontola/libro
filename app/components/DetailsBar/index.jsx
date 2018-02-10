import { TopologyProvider } from 'link-redux';

import { NS } from '../../helpers/LinkedRenderStore';

import './DetailsBar.scss';

class DetailsBar extends TopologyProvider {
  constructor() {
    super();

    this.className = 'DetailsBar';
    this.topology = NS.argu('detail');
  }
}

export default DetailsBar;
