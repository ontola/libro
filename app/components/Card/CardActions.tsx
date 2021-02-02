import React from 'react';

import '../../topologies/Card/Card.scss';

interface CardActionsProps {
  alignRight: boolean;
  noSpacing: boolean;
}

/**
 * A wrapper for CardButtons to provide for the correct styling
 * @returns {component} Component
 */
const CardActions: React.FC<CardActionsProps> = ({
  alignRight,
  children,
  noSpacing,
}) => (
  <div
    className={`CardActions ${noSpacing ? 'CardActions--no-spacing' : ''} ${alignRight ? 'CardActions--align-right' : ''}`}
  >
    {children}
  </div>
);

export default CardActions;
