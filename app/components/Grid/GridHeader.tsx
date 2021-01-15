import React, { ReactElement } from 'react';

import ContainerFloat from '../../topologies/Container/ContainerFloat';

import './GridHeader.scss';

interface PropTypes {
  /** The header floats to the top left */
  header: ReactElement;
}

/**
 * Holds a header and menu items that float to the top right of the container
 * @returns {component} Component
 */
const GridHeader: React.FC<PropTypes> = ({
  children,
  header,
}) => (
  <div className="GridHeader">
    {header && <div className="GridHeader--header">{header}</div>}
    <ContainerFloat>
      {children}
    </ContainerFloat>
  </div>
);

export default GridHeader;
