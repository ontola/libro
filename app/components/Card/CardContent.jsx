import React, { PropTypes } from 'react';

import './Card.scss';

const propTypes = {
  children: PropTypes.node,
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
  if (typeof children === 'undefined') {
    return <div />;
  }
  const className = noSpacing ? 'CardContent CardContent--no-spacing' : 'CardContent';

  return (
    <div className={className}>{children}</div>
  );
};

CardContent.propTypes = propTypes;

export default CardContent;
