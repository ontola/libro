import PropTypes from 'prop-types';
import React from 'react';

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
const CardMenuFloater = ({
  children,
  header,
}) => (
  <div className="CardMenuFloater">
    <div className="CardMenuFloater--header">{header}</div>
    <div className="CardMenuFloater--children">{children}</div>
  </div>
);

CardMenuFloater.propTypes = propTypes;

export default CardMenuFloater;
