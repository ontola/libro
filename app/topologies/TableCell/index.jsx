import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './TableCell.scss';

export const tableCellTopology = argu.ns('tableCell');

class TableCell extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'TableCell';
    this.elementType = 'td';
    this.topology = tableCellTopology;
  }
}

export default TableCell;
