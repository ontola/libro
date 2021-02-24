import React from 'react';

import '../../topologies/Card/Card.scss';

export interface CardActionProps {
  alignRight?: boolean;
  noSpacing?: boolean;
}

/**
 * A wrapper for CardButtons to provide for the correct styling
 */
const CardActions: React.FC<CardActionProps> = ({
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
