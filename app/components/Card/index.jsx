import './Card.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Renders an empty Card without padding
 * @returns {component} Component
 */
const Card = ({
  children,
}) => (
  <div className="Card">{children}</div>
);

Card.propTypes = propTypes;

export default Card;
