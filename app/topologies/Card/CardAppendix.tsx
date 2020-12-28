import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Card.scss';

export const cardAppendixTopology = argu.ns('cardAppendix');

interface PropTypes {
  children: React.ReactNode;
}

/**
 * Renders an empty CardAppendix
 * @returns {component} Component
 */
class CardAppendix extends Topology {
  public static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = cardAppendixTopology;
  }
}

export default CardAppendix;
