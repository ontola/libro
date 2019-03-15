import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';

import './TableHead.scss';

export const tableHeadTopology = NS.argu('tableHead');

class TableHead extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'TableHead';
    this.elementType = 'thead';
    this.topology = tableHeadTopology;
  }
}

export default TableHead;
