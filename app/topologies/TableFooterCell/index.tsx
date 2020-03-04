import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';

import './TableFooterCell.scss';

export const tableFooterCellTopology = argu.ns('tableFooterCell');

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
      <td className="TableFooterCell" colSpan={this.props.colSpan}>
        {this.props.children}
      </td>
    ));
  }
}

export default TableFooterCell;
