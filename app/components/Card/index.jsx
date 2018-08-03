import classNames from 'classnames';
import PropTypes from 'prop-types';

import { NS } from '../../helpers/LinkedRenderStore';
import Topology from '../Topology/index';

import './Card.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
  shine: PropTypes.bool,
  warn: PropTypes.bool,
};

const defaultProps = {
  fixed: false,
  shine: false,
  warn: false,
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class Card extends Topology {
  constructor() {
    super();

    this.topology = NS.argu('card');
  }

  getClassName() {
    return classNames({
      Card: true,
      'Card--fixed': this.props.fixed,
      'Card--shine': this.props.shine,
      'Card--warn': this.props.warn,
    });
  }
}

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

export { default as CardActions } from './CardActions';
export { default as CardAppendix } from './CardAppendix';
export { default as CardButton } from './CardButton';
export { default as CardContent } from './CardContent';
export { default as CardDivider } from './CardDivider';
export { default as CardFixed } from './CardFixed';
export { default as CardLink } from './CardLink';
export { default as CardMicroRow } from './CardMicroRow';
export { default as CardMenuFloater } from './CardMenuFloater';
export { default as CardRow } from './CardRow';
export { default as CardMain } from './CardMain';
export default Card;
