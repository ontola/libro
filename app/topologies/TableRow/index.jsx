import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

export const tableRowTopology = argu.ns('tableRow');

class TableRow extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'TableRow';
    this.elementType = 'tr';
    this.topology = tableRowTopology;
  }
}

export default TableRow;
