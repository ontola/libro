import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './TableHead.scss';

export const tableHeadTopology = argu.ns('tableHead');

class TableHead extends TopologyProvider {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: {}) {
    super(props);

    this.className = 'TableHead';
    this.elementType = 'thead';
    this.topology = tableHeadTopology;
  }
}

export default TableHead;
