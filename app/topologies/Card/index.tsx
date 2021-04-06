import clsx from 'clsx';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Card.scss';

export const cardTopology = argu.card;

interface CardProps {
  about?: string;
  className?: string;
  fixed?: boolean;
  onClick?: any;
  shine?: boolean;
  warn?: boolean;
}

type CardElementProps = {
  onClick: any;
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class Card extends Topology<CardProps> {
  public static defaultProps = {
    fixed: false,
    shine: false,
    warn: false,
  };

  constructor(props: CardProps) {
    super(props);

    this.topology = cardTopology;
  }

  public getClassName(): string {
    return clsx({
      'Card': true,
      'Card--shine': this.props.shine,
      'Card--warn': this.props.warn,
      [this.props.className || '']: true,
    });
  }

  public getElementProps(): CardElementProps {
    return {
      onClick: this.props.onClick,
    };
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
