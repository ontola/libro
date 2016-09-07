import './Card.scss';
import React, { PropTypes } from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  maxLength: PropTypes.number,
  noSpacing: PropTypes.bool,
};

/**
 * Wrapper component for Card contents
 * @returns {component} Component
 */
const CardContent = ({
  children,
  maxLength,
  noSpacing,
}) => {
  const className = noSpacing ? 'CardContent CardContent--no-spacing' : 'CardContent';
  const dots = '...';
  const content = (maxLength < children.length + dots.length)
    ? children.substr(0, maxLength) + dots
    : children;

  return (
    <div className={className}>{content}</div>
  );
};

CardContent.propTypes = propTypes;

export default CardContent;
