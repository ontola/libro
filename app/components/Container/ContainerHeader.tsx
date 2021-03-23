import React from 'react';

import ContainerFloat from '../../topologies/Container/ContainerFloat';

export interface ContainerHeaderProps {
  /** The children float to the left */
  children: React.ReactNode,
  /** The float content floats to the right */
  float: React.ReactNode,
}

/**
 * Holds a header and menu items that float to the top right of the container
 * @returns {component} Component
 */
const ContainerHeader = ({
  children,
  float,
}: ContainerHeaderProps): JSX.Element => (
  <div className="ContainerHeader">
    <div className="ContainerHeader--header">{children}</div>
    <ContainerFloat>
      {float}
    </ContainerFloat>
  </div>
);

export default ContainerHeader;
