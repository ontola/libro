import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';

import './TableFooter.scss';

export const tableFooterTopology = argu.ns('tableFooter');

class TableFooter extends TopologyProvider {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: {}) {
    super(props);

    this.className = 'TableFooter';
    this.elementType = 'tfoot';
    this.topology = tableFooterTopology;
  }
}

export default TableFooter;
