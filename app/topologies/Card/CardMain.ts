import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

import './Card.scss';

export const cardMainTopology = argu.cardMain;

interface PropTypes {
  children: React.ReactNode;
  fixed?: boolean;
}

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardMain extends Topology<PropTypes> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    fixed: PropTypes.bool,
  };

  public static defaultProps = {
    fixed: false,
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = cardMainTopology;
  }

  public getClassName() {
    return classNames({
      'Card': true,
      'Card--fixed': this.props.fixed,
    });
  }
}

export default CardMain;
