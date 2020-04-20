import PropTypes from 'prop-types';
import React from 'react';

import CardFloat from '../../topologies/Card/CardFloat';

const propTypes = {
  /** The children float to the top left */
  children: PropTypes.node,
  /** The float content floats to the top right */
  float: PropTypes.node,
};

/**
 * Holds a header and menu items that float to the top right of the card
 * @returns {component} Component
 */
const CardHeader = ({
  children,
  float,
}) => (
  <div className="CardHeader">
    <div className="CardHeader--header">{children}</div>
    <CardFloat>
      {float}
    </CardFloat>
  </div>
);

CardHeader.propTypes = propTypes;

export default CardHeader;
