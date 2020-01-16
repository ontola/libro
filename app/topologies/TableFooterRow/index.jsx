import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

export const tableFooterRowTopology = argu.ns('tableFooterRow');

/** The same as {TableRow} but needed since headers are nearly always rendered differently. */
class TableFooterRow extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'TableFooterRow';
    this.elementType = 'tr';
    this.topology = tableFooterRowTopology;
  }
}

export default TableFooterRow;
