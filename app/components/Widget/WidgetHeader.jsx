import PropTypes from 'prop-types';
import React from 'react';

import ContainerFloat from '../../topologies/Container/ContainerFloat';

const propTypes = {
  /** The children float to the top right */
  children: PropTypes.node,
  /** The header floats to the top left */
  header: PropTypes.node,
};

/**
 * Holds a header and menu items that float to the top right of the container
 * @returns {component} Component
 */
const WidgetHeader = ({
  children,
  header,
}) => (
  <div className="WidgetHeader">
    {header && <div className="WidgetHeader--header">{header}</div>}
    <ContainerFloat>
      {children}
    </ContainerFloat>
  </div>
);

WidgetHeader.propTypes = propTypes;

export default WidgetHeader;
