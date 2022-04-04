import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { tableFooterRowTopology } from '../../topologies';

/** The same as {TableRow} but needed since headers are nearly always rendered differently. */
class TableFooterRow extends TopologyProvider {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: Record<string, unknown>) {
    super(props);

    this.className = 'TableFooterRow';
    this.elementType = 'tr';
    this.topology = tableFooterRowTopology;
  }
}

export default TableFooterRow;
