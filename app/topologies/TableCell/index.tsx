import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './TableCell.scss';

export const tableCellTopology = argu.ns('tableCell');

interface PropTypes {
  colspan?: number;
  elementProps?: Record<string, unknown>;
}

class TableCell extends TopologyProvider<PropTypes> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: PropTypes) {
    super(props);

    this.className = 'TableCell';
    this.elementType = 'td';
    this.topology = tableCellTopology;
  }
}

export default TableCell;
