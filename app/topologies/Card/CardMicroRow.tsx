import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const cardMicroRowTopology = argu.ns('cardMicroRow');

interface PropTypes {
  children: React.ReactNode;
  highlighted?: boolean;
}

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardMicroRow extends Topology<PropTypes> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    highlighted: PropTypes.bool,
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = cardMicroRowTopology;
  }

  public getClassName() {
    return `CardMicroRow ${this.props.highlighted ? 'CardMicroRow--shine' : ''}`;
  }
}

export default CardMicroRow;
