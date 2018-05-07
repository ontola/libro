import { TopologyProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './Card.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
class CardAppendix extends TopologyProvider {
  constructor() {
    super();

    this.topology = NS.argu('cardAppendix');
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

CardAppendix.propTypes = propTypes;

export default CardAppendix;
