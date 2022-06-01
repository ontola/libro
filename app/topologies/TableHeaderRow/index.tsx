import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { tableHeaderRowTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

export type TableHeaderRowProps = React.HTMLAttributes<HTMLTableRowElement>;

/** The same as {@link TableRow} but needed since headers are nearly always rendered differently. */
const TableHeaderRow: TopologyFC<TableHeaderRowProps> = ({ children, ...elemProps }) => {
  const [TableHeaderRowTopology] = useTopologyProvider(tableHeaderRowTopology);

  return (
    <TableHeaderRowTopology>
      <tr {...elemProps}>
        {children}
      </tr>
    </TableHeaderRowTopology>
  );
};

export default TableHeaderRow;
