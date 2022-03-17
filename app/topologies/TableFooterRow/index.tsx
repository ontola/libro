import { TopologyProvider } from 'link-redux';

import argu from '../../ontology/argu';

export const tableFooterRowTopology = argu.ns('tableFooterRow');

/** The same as {TableRow} but needed since headers are nearly always rendered differently. */
class TableFooterRow extends TopologyProvider {
  constructor(props: Record<string, unknown>) {
    super(props);

    this.className = 'TableFooterRow';
    this.elementType = 'tr';
    this.topology = tableFooterRowTopology;
  }
}

export default TableFooterRow;
