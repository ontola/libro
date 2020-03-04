import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './TableCell.scss';

export const tableCellTopology = argu.ns('tableCell');

class TableCell extends TopologyProvider {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: {}) {
    super(props);

    this.className = 'TableCell';
    this.elementType = 'td';
    this.topology = tableCellTopology;
  }
}

export default TableCell;
