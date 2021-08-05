import React, { ReactNode } from 'react';

import CardFloat from '../../topologies/Card/CardFloat';

interface CardHeaderProps {
  /** The float content floats to the top right */
  float: ReactNode;
}

/**
 * Holds a header and menu items that float to the top right of the card
 * @returns {component} Component
 */
const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  float,
}) => (
  <div className="CardHeader">
    <div className="CardHeader--header">
      {children}
    </div>
    <CardFloat>
      {float}
    </CardFloat>
  </div>
);

export default CardHeader;
