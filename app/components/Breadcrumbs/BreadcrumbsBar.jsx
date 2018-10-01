import PropTypes from 'prop-types';

import { parentTopology } from '../../topologies/Parent/index';
import Topology from '../../topologies/Topology/index';

const propTypes = {
  children: PropTypes.node.isRequired,
  showArrow: PropTypes.bool,
};

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class BreadcrumbsBar extends Topology {
  constructor() {
    super();

    this.topology = parentTopology;
    this.className = 'BreadcrumbsBar';
  }
}

BreadcrumbsBar.propTypes = propTypes;

export default BreadcrumbsBar;
