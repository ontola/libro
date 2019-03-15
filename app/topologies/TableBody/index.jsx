import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

import './TableBody.scss';

export const tableBodyTopology = NS.argu('tableBody');

class TableBody extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'TableBody';
    this.elementType = 'tbody';
    this.topology = tableBodyTopology;
  }
}

export default TableBody;
