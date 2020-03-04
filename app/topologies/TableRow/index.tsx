import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

export const tableRowTopology = argu.ns('tableRow');

class TableRow extends TopologyProvider {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: {}) {
    super(props);

    this.className = 'TableRow';
    this.elementType = 'tr';
    this.topology = tableRowTopology;
  }
}

export default TableRow;
