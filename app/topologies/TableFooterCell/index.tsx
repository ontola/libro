import { TableCell } from '@mui/material';
import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { tableFooterCellTopology } from '../../topologies';

export const tableFooterCellCID = 'CID-TableFooterCell';

interface Props {
  colSpan?: number;
}

class TableFooterCell extends TopologyProvider<Props> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    colSpan: PropTypes.number,
  };

  constructor(props: Props) {
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
