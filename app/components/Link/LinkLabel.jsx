
import PropTypes from 'prop-types';
import React from 'react';

import './LinkLabel.scss';

const LinkLabel = ({ children }) => (
  <span className="LinkLabel">
    {children}
  </span>
);

LinkLabel.propTypes = {
  children: PropTypes.node,
};

export default LinkLabel;
