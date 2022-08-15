import { TableCell } from '@mui/material';
import { useTopologyProvider } from 'link-redux';
import React from 'react';

import { TopologyFC } from '../../../Kernel/lib/topology';
import { tableFooterCellTopology } from '../index';

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
