import { TableCell } from '@mui/material';
import { TopologyFC, createTopologyProvider } from 'link-redux';
import React from 'react';

import { tableFooterCellTopology } from '../index';

export const tableFooterCellCID = 'CID-TableFooterCell';

interface TableFooterCellProps {
  colSpan?: number;
}

const TableFooterCellTopology = createTopologyProvider(tableFooterCellTopology);

const TableFooterCell: TopologyFC<TableFooterCellProps> = ({ children, colSpan }) => (
  <TableFooterCellTopology>
    <TableCell
      className={tableFooterCellCID}
      colSpan={colSpan}
    >
      {children}
    </TableCell>
  </TableFooterCellTopology>
);

export default TableFooterCell;
