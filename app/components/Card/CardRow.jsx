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
    const { backdrop, showArrow } = this.props;
    const className = `CardRow ${showArrow && 'CardRow--show-arrow'} ${backdrop && 'CardRow--backdrop'}`;

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

CardRow.propTypes = propTypes;

export default CardRow;
