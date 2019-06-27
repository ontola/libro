import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

export const tableFooterRowTopology = NS.argu('tableFooterRow');

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
