import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { tableFooterRowTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

export type TableFooterRowProps = React.HTMLAttributes<HTMLTableRowElement>;

/** The same as {@link TableRow} but needed since headers are nearly always rendered differently. */
const TableFooterRow: TopologyFC<TableFooterRowProps> = ({ children, ...elemProps }) => {
  const [TableFooterRowTopology] = useTopologyProvider(tableFooterRowTopology);

  return (
    <TableFooterRowTopology>
      <tr {...elemProps}>
        {children}
      </tr>
    </TableFooterRowTopology>
  );
};

export default TableFooterRow;
