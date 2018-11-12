import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

import './Table.scss';

export const tableTopology = NS.argu('table');

class Table extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();
    this.className = 'Table';
    this.elementType = 'table';
    this.topology = tableTopology;
  }
}

export default Table;
