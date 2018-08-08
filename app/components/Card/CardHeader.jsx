import PropTypes from 'prop-types';
import React from 'react';

import CardFloat from './CardFloat';

const propTypes = {
  /** The children float to the top right */
  children: PropTypes.node,
  /** The header floats to the top left */
  header: PropTypes.node,
};

/**
 * Holds a header and menu items that float to the top right of the card
 * @returns {component} Component
 */
const CardHeader = ({
  children,
  header,
}) => (
  <div className="CardHeader">
    {header && <div className="CardHeader--header">{header}</div>}
    <CardFloat>
      {children}
    </CardFloat>
  </div>
);

CardHeader.propTypes = propTypes;

export default CardHeader;
