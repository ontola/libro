import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

import './TableFooterCell.scss';

export const tableFooterCellTopology = NS.argu('tableFooterCell');

class TableFooterCell extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'TableFooterCell';
    this.elementType = 'td';
    this.topology = tableFooterCellTopology;
  }
}

export default TableFooterCell;
