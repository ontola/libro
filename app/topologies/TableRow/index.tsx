import classNames from 'classnames';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './TableRow.scss';

export const tableRowTopology = argu.ns('tableRow');

class TableRow extends Topology {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  };

  constructor(props: {}) {
    super(props);

    this.className = 'TableRow';
    this.elementType = 'tr';
    this.topology = tableRowTopology;
  }

  public getClassName() {
    return classNames({
      'TableRow': true,
      'TableRow--clickable': !!(this.props as any).onClick,
    });
  }
}

export default TableRow;
