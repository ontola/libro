import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

export const tableCellTopology = NS.argu('tableCell');

class TableCell extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'TableCell';
    this.elementType = 'td';
    this.topology = tableCellTopology;
  }
}

export default TableCell;
