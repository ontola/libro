import PropTypes from 'prop-types';
import React from 'react';

import ContainerFloat from '../../topologies/Container/ContainerFloat';

const propTypes = {
  /** The children float to the left */
  children: PropTypes.node,
  /** The float content floats to the right */
  float: PropTypes.node,
};

/**
 * Holds a header and menu items that float to the top right of the container
 * @returns {component} Component
 */
const ContainerHeader = ({
  children,
  float,
}) => (
  <div className="ContainerHeader">
    <div className="ContainerHeader--header">{children}</div>
    <ContainerFloat>
      {float}
    </ContainerFloat>
  </div>
);

ContainerHeader.propTypes = propTypes;

export default ContainerHeader;
