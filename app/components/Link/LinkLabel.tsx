import React from 'react';

import './LinkLabel.scss';

const LinkLabel: React.FC = ({ children }) => (
  <span className="LinkLabel">
    {children}
  </span>
);

export default LinkLabel;
