import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { tableFooterRowTopology } from '../index';

export type TableFooterRowProps = React.HTMLAttributes<HTMLTableRowElement>;
const TableFooterRowTopology = createTopologyProvider(tableFooterRowTopology);

/** The same as {@link TableRow} but needed since headers are nearly always rendered differently. */
const TableFooterRow: TopologyFC<TableFooterRowProps> = ({ children, ...elemProps }) => (
  <TableFooterRowTopology>
    <tr {...elemProps}>
      {children}
    </tr>
  </TableFooterRowTopology>
);

export default TableFooterRow;
