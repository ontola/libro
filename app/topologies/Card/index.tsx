import clsx from 'clsx';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Card.scss';

export const cardTopology = argu.card;

interface PropTypes {
  about?: string;
  fixed?: boolean;
  shine?: boolean;
  warn?: boolean;
}

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class Card extends Topology<PropTypes> {
  public static defaultProps = {
    fixed: false,
    shine: false,
    warn: false,
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = cardTopology;
  }

  public getClassName(): string {
    return clsx({
      'Card': true,
      'Card--shine': this.props.shine,
      'Card--warn': this.props.warn,
    });
  }
}

export { default as CardAppendix } from './CardAppendix';
export { default as CardFixed } from './CardFixed';
export { default as CardFloat } from './CardFloat';
export { default as CardList } from './CardList';
export { default as CardMicroRow } from './CardMicroRow';
export { default as CardRow } from './CardRow';
export { default as CardMain } from './CardMain';
export default Card;
