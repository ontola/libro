import clsx from 'clsx';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export enum CardListDirection {
  Column = 'column',
}

interface PropTypes {
  direction?: CardListDirection;
  overflow?: boolean;
  wrap?: boolean;
}

/**
 * A list inside a CardContent
 */
export const cardListTopology = argu.cardList;

/**
 * Sets the cardList topology
 * @returns {component} Component
 */
class CardList extends Topology<PropTypes> {
  constructor(props: PropTypes) {
    super(props);

    this.topology = cardListTopology;
  }

  public getClassName(): string {
    return clsx({
      'CardList': true,
      'CardList--column': this.props.direction === CardListDirection.Column,
      'CardList--overflow': this.props.overflow,
      'CardList--wrap': this.props.wrap,
    });
  }
}

export default CardList;
