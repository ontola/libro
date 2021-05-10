import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './TableHeaderCell.scss';

export const tableHeaderCellTopology = argu.ns('tableHeaderCell');

export interface TableHeaderCellProps {
  elementProps?: Record<string, unknown>;
}

class TableHeaderCell extends TopologyProvider<TableHeaderCellProps> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: TableHeaderCellProps) {
    super(props);

    this.className = 'TableHeaderCell';
    this.elementType = 'th';
    this.topology = tableHeaderCellTopology;
  }
}

export default TableHeaderCell;
