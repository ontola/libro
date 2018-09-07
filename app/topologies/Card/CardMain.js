import classNames from 'classnames';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology';

import './Card.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
};

const defaultProps = {
  fixed: false,
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardMain extends Topology {
  constructor() {
    super();

    this.topology = NS.argu('cardMain');
  }

  getClassName() {
    return classNames({
      Card: true,
      'Card--fixed': this.props.fixed,
    });
  }
}

CardMain.propTypes = propTypes;
CardMain.defaultProps = defaultProps;

export default CardMain;
