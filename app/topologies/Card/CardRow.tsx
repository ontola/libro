import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../ontology/argu';
import Topology from '../Topology';

export const cardRowTopology = argu.ns('cardRow');

interface PropTypes {
  backdrop?: boolean;
  children: React.ReactNode;
  noBorder?: boolean;
  showArrow?: boolean;
}

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardRow extends Topology<PropTypes> {
  public static propTypes = {
    backdrop: PropTypes.bool,
    children: PropTypes.node.isRequired,
    noBorder: PropTypes.bool,
    showArrow: PropTypes.bool,
  };

  constructor(props: PropTypes) {
    super(props);

    this.topology = cardRowTopology;
  }

  public getClassName() {
    return classNames({
      'CardRow': true,
      'CardRow--backdrop': this.props.backdrop,
      'CardRow--no-border': this.props.noBorder,
      'CardRow--show-arrow': this.props.showArrow,
    });
  }
}

export default CardRow;
