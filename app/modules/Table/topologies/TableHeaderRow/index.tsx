import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { tableHeaderRowTopology } from '../index';

export type TableHeaderRowProps = React.HTMLAttributes<HTMLTableRowElement>;

const TableHeaderRowTopology = createTopologyProvider(tableHeaderRowTopology);

/** The same as {@link TableRow} but needed since headers are nearly always rendered differently. */
const TableHeaderRow: TopologyFC<TableHeaderRowProps> = ({ children, ...elemProps }) => (
  <TableHeaderRowTopology>
    <tr {...elemProps}>
      {children}
    </tr>
  </TableHeaderRowTopology>
);

export default TableHeaderRow;
