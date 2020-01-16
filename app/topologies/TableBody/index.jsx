import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './TableBody.scss';

export const tableBodyTopology = argu.ns('tableBody');

class TableBody extends TopologyProvider {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor() {
    super();

    this.className = 'TableBody';
    this.elementType = 'tbody';
    this.topology = tableBodyTopology;
  }
}

export default TableBody;
