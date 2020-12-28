import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

interface PropTypes {
  children: React.ReactNode;
}

/**
 * In the top right corner of a card
 */
export const cardFloatTopology = argu.ns('cardFloat');

/**
 * Sets the cardFloat topology
 * @returns {component} Component
 */
class CardFloat extends Topology {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: PropTypes) {
    super(props);

    this.className = 'CardFloat';
    this.topology = cardFloatTopology;
  }
}

export default CardFloat;
