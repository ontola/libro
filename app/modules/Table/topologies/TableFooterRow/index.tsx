import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import ontola from '../../../Kernel/ontology/ontola';

export const tableFooterRowTopology = ontola.ns('tableFooterRow');
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
