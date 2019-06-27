import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

import './TableFooter.scss';

export const tableFooterTopology = NS.argu('tableFooter');

class TableFooter extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'TableFooter';
    this.elementType = 'tfoot';
    this.topology = tableFooterTopology;
  }
}

export default TableFooter;
