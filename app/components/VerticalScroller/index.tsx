import React from 'react';

import './VerticalScroller.scss';

/**
 * A bar that renders its children in a single row.
 * Shows a button when the children are larger than the max width.
 * Button toggles display as single row
 * @returns {component} Component
 */
const VerticalScroller: React.FC = ({
  children,
}) => (
  <div className="VerticalScroller">
    <div className="VerticalScroller__scroll scrollbox theme">
      {children}
    </div>
  </div>
);

export default VerticalScroller;
