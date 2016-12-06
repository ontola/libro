import './Card.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  noSpacing: PropTypes.bool,
};

/**
 * Wrapper component for Card contents
 * @returns {component} Component
 */
const CardContent = ({
  children,
  noSpacing,
}) => {
  const className = noSpacing ? 'CardContent CardContent--no-spacing' : 'CardContent';

  return (
    <div className={className}>{children}</div>
  );
};

CardContent.propTypes = propTypes;

export default CardContent;
