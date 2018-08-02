import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node.isRequired,
  highlighted: PropTypes.bool,
};

/**
 * Used to divide a card in multiple rows
 * @returns {component} Component
 */
class CardMicroRow extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('cardRow');
  }

  render() {
    return this.wrap((
      <div
        className={`CardMicroRow ${this.props.highlighted ? 'CardMicroRow--shine' : ''}`}
      >
        {this.props.children}
      </div>
    ));
  }
}

CardMicroRow.propTypes = propTypes;

export default CardMicroRow;
