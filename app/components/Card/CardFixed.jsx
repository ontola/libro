import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

const propTypes = {
  children: PropTypes.node.isRequired,
  fixed: PropTypes.bool,
};

const defaultProps = {
  fixed: false,
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardFixed extends TopologyProvider {
  constructor(props) {
    super(props);

    this.topology = NS.argu('cardFixed');
  }

  render() {
    return (
      <div className="Card Card--fixed">
        {this.props.children}
      </div>
    );
  }
}

CardFixed.propTypes = propTypes;
CardFixed.defaultProps = defaultProps;

export default CardFixed;
