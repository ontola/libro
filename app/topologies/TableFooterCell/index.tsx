import { TableCell } from '@material-ui/core';
import { TopologyProvider } from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';

export const tableFooterCellTopology = argu.ns('tableFooterCell');
export const tableFooterCellCID = 'CID-TableFooterCell';

interface TableFooterCellProps {
  colSpan?: number;
}

class TableFooterCell extends TopologyProvider<TableFooterCellProps> {
  constructor(props: TableFooterCellProps) {
    super(props);

    this.topology = tableFooterCellTopology;
  }

  public render() {
    return this.wrap((
      <TableCell
        className={tableFooterCellCID}
        colSpan={this.props.colSpan}
      >
        {this.props.children}
      </TableCell>
    ));
  }
}

export default TableFooterCell;
