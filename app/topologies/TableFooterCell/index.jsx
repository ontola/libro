import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './TableFooterCell.scss';

export const tableFooterCellTopology = NS.argu('tableFooterCell');

class TableFooterCell extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
    colSpan: PropTypes.number,
  };

  constructor() {
    super();

    this.topology = tableFooterCellTopology;
  }

  render() {
    return this.wrap((
      <td className="TableFooterCell" colSpan={this.props.colSpan}>
        {this.props.children}
      </td>
    ));
  }
}

export default TableFooterCell;
