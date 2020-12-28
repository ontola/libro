import { parentTopology } from '../../topologies/Parent/index';
import Topology from '../../topologies/Topology/index';

interface PropTypes {
  children: React.ReactNode;
  showArrow?: boolean;
}

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class BreadcrumbsBar extends Topology<PropTypes> {
  public constructor(props: PropTypes) {
    super(props);

    this.topology = parentTopology;
    this.className = 'BreadcrumbsBar';
  }
}

export default BreadcrumbsBar;
