import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

interface PropTypes {
  children: React.ReactNode;
  direction: 'column' | undefined;
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
  public static propTypes = {
    children: PropTypes.node.isRequired,
    direction: PropTypes.oneOf(['column']),
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = cardListTopology;
  }

  public getClassName() {
    return `CardList ${this.props.direction === 'column' ? 'CardList--column' : ''}`;
  }
}

export default CardList;
