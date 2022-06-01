import { TableCell } from '@mui/material';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { tableFooterCellTopology } from '../../topologies';
import { TopologyFC } from '../Topology';

export const tableFooterCellCID = 'CID-TableFooterCell';

interface TableFooterCellProps {
  colSpan?: number;
}

const TableFooterCell: TopologyFC<TableFooterCellProps> = ({ children, colSpan }) => {
  const [TableFooterCellTopology] = useTopologyProvider(tableFooterCellTopology);

  return (
    <TableFooterCellTopology>
      <TableCell
        className={tableFooterCellCID}
        colSpan={colSpan}
      >
        {children}
      </TableCell>
    </TableFooterCellTopology>
  );
};

export default TableFooterCell;
