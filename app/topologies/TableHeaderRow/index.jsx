import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

export const tableHeaderRowTopology = argu.ns('tableHeaderRow');

/** The same as {TableRow} but needed since headers are nearly always rendered differently. */
class TableHeaderRow extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'TableHeaderRow';
    this.elementType = 'tr';
    this.topology = tableHeaderRowTopology;
  }
}

export default TableHeaderRow;
