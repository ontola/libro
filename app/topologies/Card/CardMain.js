import classNames from 'classnames';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Card.scss';

export const cardMainTopology = argu.ns('cardMain');

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardMain extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
    fixed: PropTypes.bool,
  };

  static defaultProps = {
    fixed: false,
  };

  constructor() {
    super();

    this.topology = cardMainTopology;
  }

  getClassName() {
    return classNames({
      Card: true,
      'Card--fixed': this.props.fixed,
    });
  }
}

export default CardMain;
