import classNames from 'classnames';
import PropTypes from 'prop-types';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Card.scss';

export const cardTopology = argu.card;

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class Card extends Topology {
  static propTypes = {
    children: PropTypes.node.isRequired,
    fixed: PropTypes.bool,
    shine: PropTypes.bool,
    warn: PropTypes.bool,
  };

  static defaultProps = {
    fixed: false,
    shine: false,
    warn: false,
  };

  constructor() {
    super();

    this.topology = cardTopology;
  }

  getClassName() {
    return classNames({
      Card: true,
      'Card--shine': this.props.shine,
      'Card--warn': this.props.warn,
    });
  }

  getElementProps() {
    return {
      onClick: this.props.onClick,
    };
  }
}

export { default as CardActions } from '../../components/Card/CardActions';
export { default as CardAppendix } from './CardAppendix';
export { default as CardButton } from '../../components/Card/CardButton';
export { default as CardContent } from '../../components/Card/CardContent';
export { default as CardDivider } from '../../components/Card/CardDivider';
export { default as CardFixed } from './CardFixed';
export { default as CardFloat } from './CardFloat';
export { default as CardLink } from '../../components/Card/CardLink';
export { default as CardList } from './CardList';
export { default as CardMicroRow } from './CardMicroRow';
export { default as CardHeader } from '../../components/Card/CardHeader';
export { default as CardRow } from './CardRow';
export { default as CardMain } from './CardMain';
export default Card;
