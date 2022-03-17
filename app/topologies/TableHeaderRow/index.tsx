import clsx from 'clsx';
import { TopologyProvider } from 'link-redux';

import argu from '../../ontology/argu';

export interface TableHeaderRowProps {
  className?: string;
}

export const tableHeaderRowTopology = argu.ns('tableHeaderRow');

/** The same as {TableRow} but needed since headers are nearly always rendered differently. */
class TableHeaderRow extends TopologyProvider<TableHeaderRowProps> {
  constructor(props: TableHeaderRowProps) {
    super(props);

    this.className = clsx('TableHeaderRow', props.className);
    this.elementType = 'tr';
    this.topology = tableHeaderRowTopology;
  }
}

export default TableHeaderRow;
