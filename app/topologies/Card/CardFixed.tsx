import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const cardFixedTopology = argu.cardFixed;

interface PropTypes {
  children: React.ReactNode;
  fill?: boolean;
  fixed?: boolean;
}

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardFixed extends Topology<PropTypes> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    /** Let the parent define the size entirely. */
    fill: PropTypes.bool,
    fixed: PropTypes.bool,
  };

  public static defaultProps = {
    fixed: false,
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = cardFixedTopology;
  }

  public getClassName() {
    return `Card Card--fixed${this.props.fill ? ' Card--fill' : ''}`;
  }
}

export default CardFixed;
