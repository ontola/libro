import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';

export const tableFooterCellTopology = argu.ns('tableFooterCell');
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
      <td
        className={tableFooterCellCID}
        colSpan={this.props.colSpan}
      >
        {this.props.children}
      </td>
    ));
  }
}

export default TableFooterCell;
