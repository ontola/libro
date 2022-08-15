import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import { tableFooterRowTopology } from '../index';

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
