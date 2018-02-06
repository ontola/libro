import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node.isRequired,
  showArrow: PropTypes.bool,
};

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardRow extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('cardRow');
  }

  render() {
    const className = this.props.showArrow ? 'CardRow CardRow--show-arrow' : 'CardRow';
    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

CardRow.propTypes = propTypes;

export default CardRow;
